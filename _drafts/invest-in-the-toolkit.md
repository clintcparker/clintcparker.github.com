---
layout: post
title: "Invest in the Toolkit"
---

Whenever someone tells me their team has a quality problem, my first question is always the same: how fast are your builds?

It sounds sideways. But it almost always leads somewhere useful.

Here's what I've observed over the years: the teams that have genuinely cracked automated testing didn't do it because they had a mandate or a policy or even a particularly disciplined culture. They did it because they invested heavily in making tests *fast* and *easy to write*. And once you've done that, the behavior follows naturally. Running tests becomes the path of least resistance, not an extra chore.

Conversely, the teams with slow builds and flaky test suites are the ones where developers skip tests. Not because they're lazy — but because the system punishes them for running tests. A 15-minute build that might fail randomly is not a tool. It's an obstacle.

So before you talk about coverage requirements or QA processes, answer this: can an engineer on your team run the full test suite in under a minute locally? Can a PR trigger a full build and return results before the engineer has had their coffee? Is coverage automatically calculated and reported on every PR without anyone having to ask?

If not, that's the investment. Not headcount. Infrastructure.

And here's what's interesting right now with AI tooling — building that infrastructure has gotten dramatically cheaper. Internal automation tools don't need to be production-grade to be enormously valuable. A one-off script that asserts a key behavior is correct every time is worth more than a backlog ticket that says "add tests" and never gets prioritized. Build the tool, use it, iterate on it.

The engineers I've watched struggle with this usually haven't been exposed to what a well-invested testing environment actually feels like. They've only ever experienced the painful version. So they associate "testing" with "slow and tedious" — and that association is wrong. It's the *implementation* that's slow and tedious. Fix the implementation, and you change the behavior.

You have to invest in it. It's not free. But the cost of the cleanup is never free either — and that bill comes due in the middle of the night, in front of customers, every time.
