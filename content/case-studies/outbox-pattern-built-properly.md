---
title: "The Outbox Pattern, Built Properly: A Spring Boot Starter for At-Least-Once Delivery"
slug: "outbox-pattern-built-properly"
publishedAt: "2026-08-28"
excerpt: "Writing to a database and publishing to a broker are two separate writes, and no amount of hoping makes them atomic. A walk through the transactional outbox pattern: claim/dispatch, crash recovery, no-coordinator horizontal scaling, and the ordering guarantee I deliberately don't make, using a Spring Boot starter I built as the worked example."
techStack: ["Java 21", "Spring Boot 4", "Spring Data JPA", "PostgreSQL", "Micrometer"]
role: "Creator & Maintainer"
duration: "Solo project, ongoing"
outcome: "Open-sourced under space.aliwassouf:outbox-spring-boot-starter: three-module library (core, autoconfiguration, test support), ~100 tests spanning unit, integration, and Postgres end-to-end suites, currently at v0.1.0."
---

## The dual-write problem, again

Here's a piece of code that looks correct and isn't:

```java
@Transactional
void createOrder(Order order) {
    orderRepository.save(order);
    kafkaTemplate.send("orders", new OrderCreatedEvent(order.getId()));
}
```

The database write is transactional. The Kafka send is not, and it can't be, because Kafka doesn't participate in your database's transaction. So you get one of two failure modes, both of which show up eventually in production and never in a demo: the transaction commits and the Kafka send fails (an order exists that nobody downstream ever hears about), or the Kafka send succeeds and the transaction rolls back (an event fires for an order that was never created). Distributed transactions (XA, two-phase commit) can paper over this, but they're operationally miserable and most message brokers don't support them anyway.

The standard fix is the **transactional outbox pattern**: instead of publishing directly, you write the event as a row in an `outbox_event` table, in the *same* database transaction as your business write. Since it's now just a row in the same database, atomicity is free: you already know how to make two writes to one database atomic. A separate background process then reads that table and does the actual publishing, on its own time, with its own retry logic. Same method, rewritten against the library:

```java
@Transactional
void createOrder(Order order) {
    orderRepository.save(order);
    outboxEventPublisher.publish("Order", order.getId(), "OrderCreated",
            new OrderCreatedPayload(order.getId()), Map.of("traceId", currentTraceId()));
    // both writes commit together, or neither does
}
```

`publish(...)` carries no `@Transactional` of its own, and specifically no `REQUIRES_NEW`. It joins whatever transaction is already open via Spring Data's default `REQUIRED` propagation, which is the entire trick: there is no window where the order exists and the event doesn't, or the reverse. On the other side, a handler is just a typed callback the relay invokes once it's dispatched the row:

```java
@Component
class OrderCreatedHandler implements EventHandler<OrderCreatedPayload> {

    @Override
    public String eventType() {
        return "OrderCreated";
    }

    @Override
    public void handle(OrderCreatedPayload payload, OutboxEventMetadata metadata) {
        kafkaTemplate.send("orders", payload.orderId(), payload);
    }
}
```

End to end, the path a single event takes looks like this:

```
+----------------------------+
| Your app                   |
| @Transactional method      |
|   1. save(order)           |
|   2. publish(event)        |
+----------------------------+
             |
             |  one commit, one rollback for both writes
             v
+----------------------------+
| outbox_event row           |
| status = PENDING           |
+----------------------------+
             |
             |  poll every outbox.relay.poll-interval
             v
+----------------------------+
| PollingOutboxRelay         |
| claim -> dispatch          |
+----------------------------+
             |
             |  handle(payload, metadata)
             v
+----------------------------+
| EventHandler               |
| Kafka / RabbitMQ / HTTP    |
+----------------------------+
```

The pattern itself is old and well-documented. What's less often written down is what it takes to implement the relay side properly: the part that claims rows, dispatches them, survives crashes, and scales past one instance without corrupting anything. I spent a while building that part as a standalone Spring Boot starter, mostly to find out how many of the diagrams in outbox-pattern blog posts quietly skip the hard parts. Most of them do.

## Claim, then dispatch: never both at once

The naive relay implementation holds a database lock on a row while it calls out to Kafka or an HTTP endpoint. That's a trap: network calls are slow and occasionally hang, and a lock held across a slow network call is a lock that can starve every other poller, including the one on the same instance five seconds later.

So the relay splits each cycle into two phases with nothing shared between them but the row's status:

1. **Claim**: a short transaction selects up to `batch-size` pending rows, locks them with `PESSIMISTIC_WRITE`, flips them to `PROCESSING`, and commits immediately. The lock is gone the instant this transaction ends.
2. **Dispatch**: with no lock held, each claimed row is deserialized and handed to the matching handler. Success marks it `PUBLISHED`; failure bumps the attempt count and schedules a backoff retry, in its own short transaction, isolated so one bad event can't take the rest of the batch down with it.

As a state machine, a row's life looks like this:

```
PENDING
  |
  |  claim: PESSIMISTIC_WRITE lock, short tx, lock releases on commit
  v
PROCESSING
  |-- dispatch succeeds ------------------------> PUBLISHED
  |-- dispatch fails, attempts < max-attempts --> PENDING  (next_retry_at = backoff)
  |-- dispatch fails, attempts >= max-attempts -> FAILED
  |
  |  crash here: lock already released, nothing watching this row
  |
  +-- orphan reaper: stuck > processing-visibility-timeout
        |-- attempts remaining --> PENDING
        +-- attempts exhausted --> FAILED
```

The obvious hole this opens: what happens if the process crashes *between* claiming a row and finishing dispatch? Nothing is watching that row anymore. The lock released when the claim transaction committed, and dispatch never finished. It just sits there, stuck in `PROCESSING`, forever, unless something checks.

That something is an **orphan reaper**, running on its own schedule, sweeping for rows that have been `PROCESSING` longer than a configured visibility timeout and putting them back to `PENDING` (or `FAILED`, if retries are exhausted). It's the same idea as an SQS visibility timeout, applied to a table instead of a queue.

And because a reclaimed row might get redelivered to a dispatcher that's still slowly finishing its original attempt, every completion write carries the claim token it was handed:

```sql
UPDATE outbox_event
SET status = 'PUBLISHED', updated_at = now()
WHERE id = :eventId
  AND locked_by = :token
  AND processing_started_at = :claimedAt
```

If the reaper has since reclaimed the row out from under a slow dispatcher, `locked_by`/`processing_started_at` no longer match, zero rows update, and that dispatcher's eventual write becomes a harmless no-op instead of quietly overwriting whatever the reclaiming dispatcher already did.

## Scaling out without a coordinator

Run more than one instance of the relay and you need them to not fight over the same rows constantly. The obvious answer is some kind of leader election or distributed lock service, and the obvious answer is more infrastructure than most teams want to run for this.

Instead, each instance independently computes which slice of the keyspace it owns. Every `outbox_event` row gets a `partition_key`; every live instance registers a heartbeat and computes a deterministic, disjoint partition range over the sorted list of currently-live instances, refreshed on an interval. No instance ever asks another instance for permission, and there's no coordinator deciding who owns what:

```
partition_key range: 0 .. partition-count - 1   (default 0..63)

live instances, sorted by instance_id, recomputed every
outbox.relay.partition-refresh-interval:

  instance-a       instance-b       instance-c
      |                |                |
      v                v                v
  owns 0-21        owns 22-42       owns 43-63

each instance's claim query adds:
  WHERE partition_key BETWEEN :rangeStart AND :rangeEnd
```

The important detail is that this partitioning is a throughput optimization, not the thing that makes the system correct. Two instances can briefly disagree about partition ownership (during a rebalance, right after one joins or drops out) and nothing breaks, because the row-level `PESSIMISTIC_WRITE` lock from the claim phase is what actually prevents double-processing. Partitioning just reduces contention by making instances mostly not compete for the same rows in the first place. Get the partitioning wrong or leave it briefly stale, and correctness holds anyway. That's a much easier property to reason about than "the coordinator must never be wrong."

## The guarantee I deliberately don't make

Ask for ordering and most systems either promise it and quietly fail to deliver, or don't think about it until a customer notices. This library takes the third option: it says up front that it does **not** guarantee in-order delivery per aggregate, and pushes the problem to the consumer instead of pretending to solve it.

Every event carries a globally monotonic `sequence_number`. If your handler cares about order, you either track `last_applied_sequence` per aggregate and buffer anything that arrives out of turn, or you route through a transport that gives you ordering natively (Kafka with the aggregate ID as the partition key, for instance) and let the transport do the reordering work it's already good at. What you don't get is a library that claims to guarantee order while a horizontally-scaled polling relay makes that guarantee essentially impossible to keep honestly.

This pairs with the other guarantee that's easy to overpromise: delivery is at-least-once, not exactly-once. A crash-recovered row or a retried dispatch means your handler *will* occasionally see the same event twice. Handlers need to be idempotent. Writing that down as a load-bearing requirement, instead of quietly hoping consumers figure it out, is cheaper than debugging the alternative.

## What's actually pluggable

Two things stay generic on purpose. The relay mechanism is an interface (`OutboxRelay`/`OutboxEventFetcher`); it ships a polling implementation, but a CDC-based relay reading the database's write-ahead log instead of polling could sit behind the same contract without touching anything upstream. And delivery targets are entirely undefined by the library: it hands your `EventHandler` a deserialized payload and metadata, and what you do with it (Kafka, RabbitMQ, a webhook) is yours to decide. The library's job stops at "get the event out of the table reliably," which is a smaller, more honest scope than trying to also be a Kafka client.

It's on Maven Central-bound coordinates (`space.aliwassouf:outbox-spring-boot-starter`), currently at `0.1.0`, with the three modules split cleanly: core, autoconfiguration, and a test-support module with fluent assertions for anyone building handlers against it. If you're solving this problem yourself right now with a cron job and a prayer, the source is worth a read even if you never add the dependency.
