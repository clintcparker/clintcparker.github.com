---
layout: post
title: "Strangers on the Internet, or Why PRs Are Conversations, Not Notifications"
date: 2026-03-29T18:26:19+00:00
---

Here's something I say a lot that usually gets a reaction: *we are not strangers on the internet.*

The open-source PR model — push your work, notify the team, hope someone picks it up, iterate based on comments — makes total sense when contributors don't know each other and are working across time zones and organizations with no shared context. It was built for that. It works great for that.

It does not work great for a team of people who sit (or video call) together every week, have shared context on the codebase, and are accountable to each other for delivery outcomes.

When I watch internal teams use the open-source model, I see a few things consistently:

**PRs get big before anyone looks at them.** The engineer works in isolation until they think the thing is done, then opens a PR with thirty changes. The reviewer now has to reconstruct the entire intent of the work from the diff. This is expensive for the reviewer, and the engineer has already invested too much to pivot meaningfully on structural feedback.

**Reviews become rubber stamps or rabbit holes.** Either the reviewer approves because the thing looks roughly right and they don't want to slow it down, or they find a fundamental problem and now you have a PR comment thread that should have been a twenty-minute conversation three days ago.

**Coverage and quality go sideways late.** By the time someone notices a testing gap or an architectural issue, the engineer is context-switched out and getting back up to speed costs time neither of you wanted to spend.

The model I've had the most success with is straightforward: have the conversation early, stage the review, and use the PR to confirm shared understanding rather than initiate it.

Specifically — if you're working on something that someone else will need to sign off on, loop them in before you start. "I'm going to do this thing. Here's my plan. Any concerns?" Then, at the midpoint, show them the architecture — not the implementation details, just the structure. Names, boundaries, where things live. Get that directional feedback when it's cheap to act on. Then finish the implementation and let the PR be the final confirmation: here's what we talked about, here's what I built, here's the test coverage that says it works.

If the PR fails automated checks (coverage below threshold, build broken, linting issues) it doesn't even need to get to a human. It goes back to the engineer with a clear signal. Fix the basics first. Don't ask me to spend time on work that doesn't meet the baseline.

PRs as the ends of conversations. It's a small mental shift with a surprisingly large impact on how smoothly a team moves.
