---
title: "Why Systems Thinking Changed How I Write Code"
slug: "systems-thinking-in-code"
category: "thoughts"
publishedAt: "2024-11-15"
excerpt: "Most engineering failures aren't caused by bad code. They're caused by a failure to understand the system the code lives in."
tags: ["systems", "engineering", "mental-models"]
wordCount: 1240
---

Most engineering failures aren't caused by bad code.

They're caused by a failure to understand the *system* the code lives in.

I used to think good engineering meant writing clean, well-tested, well-documented functions. It does — but only in the way that knowing grammar means you can write good prose. Grammar is necessary but not sufficient. The craft lives at a higher level.

## What systems thinking actually means

Systems thinking is the practice of understanding how the parts of a system interact with each other — and with their environment. It asks not just "what does this component do?" but "how does this component's behavior change when the rest of the system changes around it?"

This sounds abstract, but it becomes very concrete very quickly.

Consider a simple API endpoint with a timeout. If you set the timeout to 5 seconds, you've made a decision about the system's behavior under load. But have you considered:

- What happens upstream when your endpoint is slow?
- What does the caller do when you time out?
- Do retries exist? Are they bounded?
- Does your timeout interact with a database connection pool limit?

Each of these is a feedback loop. Each feedback loop can amplify or dampen behavior in ways that are completely non-obvious from reading the function in isolation.

## The accumulation problem

Most systems fail gradually, then suddenly.

Resources accumulate — connections, memory, queue depth — and the system appears to be working fine until it isn't. This is the hallmark of a system without negative feedback: nothing pushes back against the accumulation until it crosses a threshold.

When I review code now, I'm looking for accumulations. I'm asking: what can pile up here? What prevents it from piling up indefinitely? Is that mechanism reliable under the conditions where accumulation is most likely?

## Applying it in practice

The practical change in my work was this: I stopped thinking about my code as the thing and started thinking about it as *one part of a larger system*. My code has inputs, outputs, and side effects — and those side effects ripple outward in ways I can model.

Before I write a new service, I ask:
- What are the failure modes of my dependencies?
- What happens to my callers when I fail?
- What does load look like at 10x current? 100x?
- What are the feedback loops, and are they stabilizing or destabilizing?

These aren't novel questions. But they become instinctive only when you've internalized the systems frame.

## Where to go deeper

If this resonates, the canonical text is Donella Meadows' *Thinking in Systems*. It was written for general audiences but its mental models transfer directly to software.

Read it. Then re-read your on-call runbook. You'll see it differently.
