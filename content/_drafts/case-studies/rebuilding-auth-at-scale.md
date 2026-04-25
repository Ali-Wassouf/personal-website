---
title: "Rebuilding Auth at Scale: From JWT to PASETO"
slug: "rebuilding-auth-at-scale"
publishedAt: "2024-10-02"
excerpt: "Our JWT-based auth was working — until it wasn't. Here's how we migrated 2M users to PASETO tokens with zero downtime and what we learned about secure token design along the way."
tags: ["security", "backend", "aws", "zero-downtime"]
techStack: ["Node.js", "AWS Lambda", "Redis", "PostgreSQL", "PASETO"]
role: "Lead Engineer"
duration: "3 months"
outcome: "40% reduction in auth-related incidents, zero-downtime migration of 2M users"
wordCount: 2100
---

## The problem

Our JWT implementation had accumulated three years of decisions that made sense independently but composed poorly.

Token lifetimes were inconsistent across services. The signing key rotation process required a deploy. We had no standard for claim validation, so different services validated different subsets of the same claims. And the shared secret for `HS256` was rotated annually at best.

The trigger was an incident where a compromised internal tool — not our auth service — used a valid-but-leaked token to make requests that our system considered legitimate. The token was well-formed, the signature was valid, and the claims were technically correct. We had no mechanism to detect that it was being used from an unexpected context.

## Why PASETO

PASETO (Platform-Agnostic Security Tokens) solves several structural problems with JWT:

1. **No algorithm confusion.** JWT allows you to specify the signing algorithm in the header. This has historically been exploited by switching `RS256` to `none`. PASETO has versioned, opinionated token types — no algorithm negotiation.
2. **Local vs. public tokens.** PASETO explicitly distinguishes between tokens that are symmetric (for local use) and asymmetric (for cross-service trust). This maps cleanly to our trust model.
3. **Authenticated encryption.** PASETO `v4.local` tokens use BLAKE2b-based authenticated encryption. The claims are encrypted, not just signed — so token contents aren't readable by anyone who intercepts them.

## The migration architecture

Zero-downtime migration with 2M active sessions required a dual-validation phase.

### Phase 1: Parallel issuance (weeks 1–2)

We deployed a token service that issued *both* JWT and PASETO tokens at login. The JWT was returned to the client (for backwards compatibility). The PASETO token was stored server-side, keyed to the session ID embedded in the JWT.

All services were updated to: on receiving a JWT, look up the corresponding PASETO token in Redis, validate *that*, and proceed. The JWT itself was treated only as a session identifier, not as proof of identity.

This let us get PASETO validation deployed and battle-tested without breaking any existing clients.

### Phase 2: Client migration (weeks 3–8)

We added a response header `X-New-Token` containing the PASETO token whenever we validated a request. Client SDKs were updated to detect this header, store the PASETO token, and prefer it on future requests.

Clients that hadn't updated within 60 days were migrated forcibly at their next login.

### Phase 3: JWT deprecation (weeks 9–12)

Once client adoption reached 99.2%, we stopped accepting raw JWT validation. The legacy JWT-to-PASETO lookup table was maintained for another 30 days for the long tail, then deleted.

## What we learned

**Token design is API design.** The claims in your tokens are a public interface. They're hard to change once clients depend on them. Treat them with the same care as an API contract.

**Key rotation should be operational, not heroic.** We built key rotation into the deployment pipeline. New key pairs are generated on a 90-day schedule; the public key set is served at a well-known endpoint. Services refresh the key set on a 5-minute interval.

**The security boundary is the validation logic, not the token format.** PASETO didn't make us secure. Consistent, centralized validation logic did. The token format reduced the surface area for validation mistakes, but the validation logic itself was the critical path.

## Outcome

Auth-related incidents dropped by 40% in the six months following full rollout. More importantly, the nature of the incidents changed — from "we don't know if this is legitimate" to "we have a clear log of what happened and why."

The incident response runbook for auth issues went from 12 steps to 4.
