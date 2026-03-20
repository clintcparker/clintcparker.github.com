---
layout: post
title: "Ship the Change, Not the Bundle"
---

In May of 2023 we moved from a structured two-week deployment cadence to hourly deploys. I wrote about it in my year-in-review post, but I want to revisit the *why* — because I've been having this conversation again with teams that are still on the bundled release model and wondering why their quality feels so hard to maintain.

The two-week release cadence has a few specific failure modes that people rarely name directly:

**You're deploying a mystery box.** Two weeks of work from multiple engineers, touching multiple parts of the system, reviewed over different days in different contexts — all deployed at once. When something breaks, you're not debugging a change. You're debugging a bundle. The signal-to-noise ratio is brutal.

**Regression testing becomes a project.** I talked with someone recently whose team spends *two weeks on regression testing*. Two weeks of testing before a two-week cycle of building. That means half the calendar is spent validating the previous half. That's not engineering — that's archaeology.

**Hotfixes expose the lie.** Every team with a two-week release schedule has a hotfix process. That process bypasses the release schedule entirely. Which means you've already decided that when something is important enough, the process doesn't apply. That's not a stable system — that's a system with a known escape hatch that makes the whole structure feel mandatory when it isn't.

The fix isn't complicated, though it does require investment. Feature flags are the enabling technology. When every change is behind a flag, shipping becomes decoupled from releasing. You deploy constantly. You turn things on deliberately. You can inspect a single customer's behavior with the flag on before you roll it out broadly. Production incidents are measured in minutes rather than hours because you know exactly what changed and when.

The mental model shift is: *deployment is a technical event, release is a product decision*. Collapsing those two things is what makes bundled deploys feel necessary. Separating them is what makes continuous deployment feel safe.

Ship the change. See if the system is still healthy — which takes about fifteen minutes if you're watching the right signals. Then move on. If something's wrong, you know exactly what to roll back, the engineer who wrote it is still in context, and nobody is staying up until 2am triaging a deployment that touched thirty things at once.
