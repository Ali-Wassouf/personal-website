---
title: "The Future of AI Tooling Isn't Autocomplete"
slug: "on-the-future-of-ai-tooling"
category: "thoughts"
publishedAt: "2025-01-08"
excerpt: "We're in the autocomplete phase of AI tooling. The interesting question is what comes after it."
tags: ["ai", "tooling", "future", "engineering"]
wordCount: 980
---

We're in the autocomplete phase of AI tooling.

It's impressive. It's genuinely useful. And it's going to look quaint in five years.

## What autocomplete misses

Current code generation tools — in their most common form — predict the next token, or the next function, or the next block. They're exceptional at pattern completion. Where they struggle is at the level of *intent*.

A senior engineer doesn't just know patterns. They know which patterns are appropriate given the constraints of the system, the team, the timeline, and the risk tolerance of the organization. That knowledge isn't in the code. It's in the context around the code.

AI tools today have partial access to that context — whatever fits in a context window — but they don't have the *accumulated judgment* that comes from watching a decision play out over six months in production.

## The shift I'm watching for

The next phase won't be about generating more code. It'll be about generating *better-situated* code — code that reflects a model of the system it lives in, not just the local syntax it's part of.

This requires AI tools to have persistent, evolvable models of:
- The architecture and its invariants
- The team's conventions and the *reasons* for them
- The current trajectory of the codebase

Some of this is starting to appear. Tools that understand your codebase as a whole, not just the open file. Repository-level analysis. Architectural pattern recognition.

## What this means for engineers

I don't think engineers are going away. I think the nature of what we spend time on is shifting.

The tasks that are being automated are, by and large, the low-judgment tasks — the boilerplate, the repetitive transformations, the documentation of patterns that already exist.

The tasks that remain require high judgment: knowing what to build, knowing when a pattern doesn't apply, knowing when a technically correct solution is wrong for this context.

The engineering skill that will compound most in value over the next decade is the ability to think clearly about systems at multiple levels of abstraction simultaneously. That's not something that's close to being automated.

Invest accordingly.
