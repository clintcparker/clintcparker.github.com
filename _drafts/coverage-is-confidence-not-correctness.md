---
layout: post
title: "Coverage Is Confidence, Not Correctness"
---

I always make this clear to the engineers I work with: you can have 100% test coverage and still have bugs. Tests prove what you *thought* to check, not what you forgot to think about.

So why do I care about coverage? Why do I use it as a gate on PRs?

Because coverage is a proxy for *confidence*, and confidence is transferable.

When an engineer submits a PR with solid coverage, what they're actually communicating is: I thought about how this should work. I wrote down my expectations. I verified them. You can review my logic, my implementation, *and* my assumptions. The whole picture is here.

When a PR comes in with no tests, there's no picture. There's just code. And now the reviewer has to build the mental model of "does this work correctly?" entirely from scratch, with no help from the person who knows it best.

That's wasteful. And it's unfair to the reviewer.

More practically: coverage gives you something to measure. And things you measure improve. We went from informal testing expectations to near-40% total line coverage with behavioral tests across all backend code in about six months — not by demanding it, but by making it visible, celebrating it, and building it into the workflow so it was obvious when it was missing.

The number itself isn't magical. 40% isn't 80%, and 80% isn't perfect. What matters is the trajectory and the habit. A codebase where coverage has been growing for six months is a fundamentally different place to work than one where nobody's thought about it.

One thing I'd push back on, though: don't let coverage become the goal in itself. I've seen engineers write tests that technically execute lines of code without asserting anything meaningful — just to hit a threshold. That's worse than no tests, because it creates false confidence.

The goal is tests that *mean something*. Tests that say: if this breaks, we'll know. If the behavior changes unexpectedly, this will catch it. That's the bar. Coverage is just how you start measuring whether you're getting there.
