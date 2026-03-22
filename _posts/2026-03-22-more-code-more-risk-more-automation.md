---
layout: post
title: "More Code, More Risk ... More Automation"
date: 2026-03-22T19:11:34+00:00
---

One of the things I keep saying to engineering teams right now is: this tool should improve the process on *all* fronts. Not just the building. All of it.

AI-assisted development is genuinely remarkable. Engineers are shipping features faster, clearing backlogs that felt immovable, and getting real leverage from tooling that would've taken months to build before. I'm a fan. I'm actively encouraging it.

But faster output without better validation is just faster bugs. I've seen it — and heard it from peers managing teams at scale. Engineers trust the output, skip the second look, and something breaks in production. The specific failure mode varies. The root cause almost never does: the code moved faster than the confidence in it.

The issue isn't that AI makes mistakes. It does, and so do humans. The issue is that when the *volume* of work goes up, the *surface area for mistakes* goes up with it. If your validation process doesn't scale at the same rate, you end up cleaning up behind yourself constantly.

The answer isn't to slow down. It's to automate your safety net.

Fast builds. Fast test runs. Automated coverage thresholds that fail a PR before it ever hits a human reviewer. If the test coverage isn't there, the PR doesn't get reviewed. Period. That sounds harsh, but it's actually generous — it tells the engineer clearly and immediately what they need to do before asking anyone else to spend time on their work.

I also think there's something important here about how we use AI in the validation loop, not just the construction loop. Use it to generate test cases. Use it to review test coverage for gaps. Have it challenge your assumptions about how a feature might fail. A lot of what a good QA person does — thinking adversarially about software — can be augmented with the same tools you're using to write the code.

The teams that win with AI aren't the ones moving fastest. They're the ones who figured out how to move fast *and* land cleanly.