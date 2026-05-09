---
title: "The Kitchen Nobody Labelled"
slug: "the-kitchen-nobody-labelled"
category: "thoughts"
publishedAt: "2026-05-09"
excerpt: "On documentation, onboarding, and the human cost of tribal knowledge. Why undocumented systems are an unfair tax on new engineers — and why ADRs are the most powerful thing you can write, especially in an age of LLMs that hallucinate confidently."
wordCount: 2900
---

*On documentation, onboarding, and the human cost of tribal knowledge*

---

## The Kitchen Nobody Labelled

Imagine it's your first day in a professional kitchen. Nobody shows you where the utensils are, who to ask about what, or when lunch preparation begins. You open a drawer labelled *Knives* and find spoons and forks — someone reorganised it weeks ago and never updated the label.

Everyone around you moves with confidence. They know where things are, how things work, who owns what. You don't. And in the noise and heat of a busy kitchen, nobody has time to explain.

You feel inadequate. Out of place. Not because you're a bad cook — but because the kitchen is a labyrinth of unspoken knowledge, and you were handed an apron and pointed at the door.

Now here's the thing: different people adapt at different speeds. Personality, resilience, prior experience — they all play a role. But one thing is certain: if the kitchen were properly organised and clearly labelled, the *only* reason someone would struggle is because they genuinely aren't good enough. Remove the artificial confusion, and you remove the noise. What's left is signal.

This is not a metaphor about restaurants.

---

## The Sink or Swim Culture

This is the reality of onboarding in software engineering teams — especially teams without strong leadership. A sink-or-swim culture takes hold, quietly, without anyone deciding it should.


A new engineer joins. They get handed a MacBook and a Slack invite and are expected to find their way. No map of the codebase. No record of why the architecture looks the way it does. No indication of which parts are stable and which are held together with good intentions.

And then — the part that I find genuinely unfair — comes the feedback cycle. Performance is measured against engineers who built the system from scratch, who carry years of context in their heads. There is no way to trace a decision back to the *why* behind it. There is no documentation that says: *we tried the other approach, here's why it failed*. The new engineer is judged not on their ability, but on how quickly they could navigate a maze nobody drew a map for.

I've seen this play out. I've lived it. And I've heard the same story from almost every engineer I know.

---

## Introducing LLMs

This issue — missing maps, missing context, missing *why* — is not new. Teams have always struggled with it. But the arrival of large language models is making it measurably worse, because it has given the problem a convincing disguise.

The expectation now, spoken or not, is that a new engineer can simply point an LLM at the codebase and ask it to explain everything. Feed it the files. Let it summarise. Problem solved.

Except it isn't.

The first crack in this logic is mechanical: an LLM has a context window. There is a hard ceiling on how much it can hold in its attention at once. A mature production codebase — with its sprawl of services, years of accumulated decisions, and layers of half-refactored legacy — does not fit inside that window. The model is not reading your system. It is reading a fragment of it, and filling in the rest with its best guess.

And LLMs are very good at guessing. That is precisely the problem.

When an LLM doesn't know something, it doesn't stop and say so. It continues in the same confident, well-structured prose it uses when it *does* know. It will explain the intent behind a function that has no documented intent. It will describe the reasoning behind an architectural decision that was never written down. It will tell your new engineer a coherent, plausible story — and that story may have no relationship to what actually happened, or why.

This is not a bug in the model. It is how these systems work. They are trained to produce fluent, contextually appropriate responses. Uncertainty does not naturally surface. Hallucination does not announce itself.

So what you get is not a knowledgeable colleague filling in the gaps. You get a very articulate tour guide who has never actually been to the city, describing streets with total conviction, sending your new engineer confidently in the wrong direction.

Undocumented code was always a problem. Undocumented code with an AI confidently narrating it is a new kind of problem — because now the gaps are hidden behind an explanation that *sounds* complete.

---

## The Four Months Nobody Counted

I want to make this personal, because I think abstractions let people off the hook too easily.

I once joined a team working on one of the most complex pieces of business logic I had ever encountered: automating the creation of loan-backed securities. A field I had never touched. A web of financial regulations, accuracy standards, and architectural decisions layered on top of each other over years — with no map, no ADRs, and no one with the time to walk me through it.

The code was there. The *why* was not.

It took me four months to feel genuinely comfortable in that codebase. Not four months of clean nine-to-six hours — four months of evenings spent deciphering logic, weekends writing integration tests just to understand why a piece of code was written a certain way, and countless hours hunting for context scattered across Confluence pages, Slack threads, and the memories of colleagues who were already stretched thin.

I am not saying this to complain. I am saying it because it was completely avoidable.

When I finally arrived at a refinement session and held my own — arguing trade-offs with senior engineers who had built the system from the ground up, articulating the impact of a proposed change with real confidence — it felt like earning something. It was genuinely one of the more satisfying moments of my career.

But here is what stings: none of that effort was ever acknowledged in a feedback cycle. Not once. The four months of after-hours work, the self-directed archaeology through an undocumented system, the deliberate effort not to become a burden on my teammates while I found my footing — none of it showed up as a data point anywhere.

I am not raising this because I needed recognition. I raise it because the absence of acknowledgement reveals something uncomfortable about how we measure engineers. We compare new joiners against people who have years of invisible context. We call it performance. We do not call it what it is: an uneven playing field that the team built and the new engineer had to pay for.

And I was one of the ones who made it through. I dread to think about the engineers who didn't — not because they lacked ability, but because the kitchen had no labels, and nobody noticed.

---

## Mitgefühl

There is a word in German that does not translate cleanly into English: *Mitgefühl*. Literally, it means "feeling with" — not pity from a distance, but a genuine sharing of another person's experience. Sympathy, in its truest sense.

I think about this word a lot. We live in an age where engineers spend the majority of their working day speaking to machines — reading logs, writing code, querying systems that do not have feelings and do not need consideration. It is easy, in that environment, to forget that at the end of every pull request, every deployment, every onboarding ticket, there is a human being.

*Mitgefühl* is one of my core values. And it shapes how I work, even when — especially when — the work feels purely technical.

It was this value that pushed me to act after those four months. I had earned the context. I knew the system. And I made a choice: this knowledge would not be boxed up and buried. It would be written down, structured, and made available to every engineer who came after me.

So I built an onboarding wiki. It took extra hours I was not asked to spend. I drew on something unexpected — during my university years I had contributed to Wikipedia, and I had learned how to write articles that connect, how to structure information so that a reader can follow a thread without getting lost. That skill, which had nothing to do with software engineering, turned out to be exactly what the team needed.

The next engineer to join had no prior fintech experience at all. They were contributing meaningfully within two months.

I eventually moved to a different team. Time passed. Then a colleague from my new team transferred to my old one — a senior engineer with thirteen years of fintech experience. After he had settled in, I reached out. I will be honest: I wanted to know if the wiki had held up. We all seek acknowledgement of our efforts, and I am not ashamed of that.

What he said has stayed with me. He told me it was one of the best-documented systems he had ever worked with in his career, and that his integration into the team had been seamless because of it.

Thirteen years in fintech. Seamless onboarding. Because someone decided that the next engineer's struggle was worth preventing.

That is what *Mitgefühl* looks like in a codebase.

---

## How to Build Documentation That Actually Works

Not all documentation is equal. Teams that treat it as a single monolithic obligation — one giant wiki that tries to capture everything — usually end up with something that is either incomplete, outdated, or so overwhelming that nobody reads it. The key is to understand that a software system has two distinct layers, and each one needs a different kind of documentation.

The first layer is the **core business logic**. This is the heart of what the system does — the rules, the domain concepts, the edge cases that took months to discover. Teams evolve, features get added, scope expands and contracts. But the core logic tends to be stable. It does not rewrite itself every quarter. This is the piece that a new engineer most desperately needs to understand, and it is almost always the least documented. Write it down. Explain the domain. Define the terms your team uses internally. Map the flows that matter. This document should be the first thing a new engineer reads, and it should be written as if they have never heard of your industry before — because one day, someone who hasn't will join your team.

The second layer is the **architecture**. The key components, the boundaries between services, the data flows, the dependencies. Some of this will change over time, and that is fine — but the changes should be reflected. An architecture document that describes a system from three years ago is not documentation. It is archaeology.

But neither of these is the most important piece of documentation your team can produce.

That distinction belongs to the **ADR** — the Architecture Decision Record.

An ADR is a short, structured document that captures a single architectural or technical decision: what the options were, what was chosen, and — most critically — *why*. Not the what. The why.

This is the piece of information that disappears fastest and costs the most when it is gone. Why is the system built this way? Why did we choose PostgreSQL over Cassandra here? Why do we have this seemingly redundant service? Without ADRs, the answers to these questions live exclusively in the heads of the engineers who were in the room when the decision was made. When those engineers leave — and they will leave — the answers go with them. What remains is a codebase that works, but cannot explain itself.

ADRs change this. They create a traceable, honest record of the team's thinking over time. A new engineer reading through them does not just learn *what* the system is — they learn how it became what it is. They inherit the reasoning, not just the outcome. They can argue trade-offs with context rather than guessing. They can challenge decisions intelligently, because they understand the constraints that shaped them.

---

### Documentation Creates Reality

There is a deeper point here, and Yuval Noah Harari makes it better than I can.

In *Nexus*, Harari argues that documentation is not merely a record of reality — it is a mechanism for *constructing* it. Human civilisations scaled beyond what any individual mind could hold because they developed the ability to write things down and have others act on those writings as though they were true. Laws, constitutions, contracts, financial instruments — none of these exist in nature. They exist because they were documented, and because that documentation gave them the power to shape behaviour across time and distance, between people who had never met and never would.

A codebase is no different. The system your team builds does not exist purely in the code. It exists in the shared understanding of why it was built that way — the decisions made, the trade-offs accepted, the constraints acknowledged. When that understanding lives only in human memory, it is fragile, partial, and mortal. When it is written down, it becomes something more durable. It becomes an organisational reality that can survive the departure of any individual, onboard any successor, and be reasoned about by anyone with access to it.

To skip documentation is not just a productivity failure. It is a failure to make your system's reality legible — to your team, to your future colleagues, and increasingly, to the AI tools you are asking to help you work within it.

---

### ADRs and LLMs: A Powerful Combination

Here is something worth saying explicitly in an era where everyone is reaching for an LLM: ADRs are one of the most powerful things you can feed a model.

When a new engineer asks an AI to explain the codebase, the model works with what it has. Code tells it *what* the system does. ADRs tell it *why* the system was built this way. With ADRs in context, an LLM stops guessing at intent and starts working with documented reasoning. Its explanations become grounded. Its suggestions become more relevant. The gap between what the model confidently says and what is actually true becomes significantly smaller.

In other words, ADRs do not just help humans onboard. They make AI assistance meaningfully more reliable. They are the antidote to the confident hallucination problem — because they give the model something real to hold onto.

Write the ADR at the moment of the decision, not after. Keep it short — a page is enough. Do not let perfect be the enemy of done. A rough ADR written in twenty minutes the day a decision is made is worth infinitely more than a polished one written six months later from memory, or never written at all.

---

## The Label on the Drawer

We started in a kitchen. A new cook, a mislabelled drawer, and a team too busy — or too unbothered — to leave things in a state that made sense to anyone other than themselves.

It is a small image, but it contains everything.

The unlabelled kitchen is not a symptom of bad engineers. It is a symptom of a culture that has quietly decided that the next person's experience is not worth the investment. That tribal knowledge is a reasonable substitute for written truth. That a new joiner's struggle is a rite of passage rather than an avoidable tax on human potential.

We can do better. Not by burying ourselves in documentation theatre — endless wikis maintained for their own sake, process for the sake of process. But by doing the small, deliberate things that make a system legible to the next human who has to work inside it.

Document the core business logic, so the domain does not have to be rediscovered from scratch every time someone new arrives. Maintain the architecture, so the map reflects the territory. And write the ADR — especially the ADR — so that the *why* behind your decisions outlives the people who made them.

Because as Harari reminds us, what we write down does not just record reality. It *creates* it. The shared understanding of your system — its purpose, its constraints, its history — only becomes organisational reality when it is made legible. Everything else is just memory. And memory, as every engineer who has ever lost a key colleague knows, is not a reliable infrastructure.

I think about the engineer who might join your team next month. They are capable. They are motivated. They want to contribute, reduce the burden on their teammates, and do good work. What they cannot do — what no one can do — is read minds.

Give them the labelled drawer.

Not for recognition. Not for process compliance. But because you remember what it felt like when nobody gave it to you — and you have enough *Mitgefühl* to make sure they do not have to feel the same.

