# Quality at Speed — Blog Series + LinkedIn Posts

---

<!-- ## Post 1: Testing Is a Team Sport

**LinkedIn:**

Nobody on your team should be writing code and throwing it over the wall for someone else to validate.

But also — nobody should be using AI to generate a pile of code and then treating QA as the cleanup crew.

Quality is the team's job. All of them. Together.

If it breaks, the person who built it and the person who reviewed it are both on the hook. That's not a punishment. That's how good software gets made.

---

**Blog Post:**

I've had some version of this conversation with multiple engineering leaders lately, and I keep landing in the same place: **quality is a team sport, and most teams haven't figured that out yet.**

Here's the dynamic I see a lot. You've got developers who write their code, write their tests (maybe), and hand the whole thing off. Somewhere downstream, a tester or QA person picks it up and starts poking holes. When they find something, it goes back. When they don't, it ships. Everyone's doing their job. And yet somehow, bugs still make it to production, morale is still low, and the whole thing feels slower than it should.

The problem isn't the people. The problem is the model.

Separating "building" from "quality" creates distance — between the person who knows the most about how something was constructed and the process of verifying that it works correctly. That distance is where bugs hide.

The fix isn't to hire more testers. It's to collapse that distance. Make the people accountable for delivery also accountable for correctness. Pair them up. If two engineers worked on a feature together, they're both on the hook if it breaks. Not "well, she was supposed to test it" — no. Both of you. Own it.

What I've seen work is building that expectation into the culture from the top. Not as a punitive thing, but as a shared pride thing. We built it. We stand behind it. If it's wrong, we fix it, we learn from it, and we make sure it doesn't happen that way again.

The corollary to this is that no single person in an org should carry "quality" as their sole responsibility. One QA lead against a team of fifteen engineers is not a quality strategy. It's a bottleneck with a job title. The engineering leaders — the people accountable for delivery — also have to be accountable for what they deliver working correctly. That's not a radical idea. It's just engineering maturity.

Quality isn't a department. It's an expectation. -->

---
---

<!-- ## Post 2: AI Moves Fast. Your Quality Bar Needs to Keep Up.

**LinkedIn:**

AI is making your engineers faster. That's great.

But faster output without better validation is just faster bugs.

The volume of code being written has gone up dramatically. The quality bar has to scale with it. That means automation. Not optional automation — required automation.

You can't move at AI speed and validate at human speed. The math doesn't work.

---

**Blog Post:**

One of the things I keep saying to engineering teams right now is: this tool should improve the process on *all* fronts. Not just the building. All of it.

AI-assisted development is genuinely remarkable. Engineers are shipping features faster, clearing backlogs that felt immovable, and getting real leverage from tooling that would've taken months to build before. I'm a fan. I'm actively encouraging it.

But I've also watched a few weeks where AI moved fast and quality didn't keep up. Three incidents in quick succession. In each case, an engineer trusted the output, didn't double-check, and something broke in production. A query returning 600,000 rows when it should've returned ten. A database config change that brought down a service. Fixable things — but things that could've been caught with a second look or a passing test.

The issue isn't that AI makes mistakes. It does, and so do humans. The issue is that when the *volume* of work goes up, the *surface area for mistakes* goes up with it. If your validation process doesn't scale at the same rate, you end up cleaning up behind yourself constantly.

The answer isn't to slow down. It's to automate your safety net.

Fast builds. Fast test runs. Automated coverage thresholds that fail a PR before it ever hits a human reviewer. If the test coverage isn't there, the PR doesn't get reviewed. Period. That sounds harsh, but it's actually generous — it tells the engineer clearly and immediately what they need to do before asking anyone else to spend time on their work.

I also think there's something important here about how we use AI in the validation loop, not just the construction loop. Use it to generate test cases. Use it to review test coverage for gaps. Have it challenge your assumptions about how a feature might fail. A lot of what a good QA person does — thinking adversarially about software — can be augmented with the same tools you're using to write the code.

The teams that win with AI aren't the ones moving fastest. They're the ones who figured out how to move fast *and* land cleanly.

---
--- -->

## Post 3: Invest in the Toolkit

**LinkedIn:**

"We need better testing" is not a strategy.

Investing in *how* testing happens — fast builds, automated pipelines, coverage thresholds baked into CI — that's a strategy.

The teams I've seen do this well didn't hire their way to quality. They built their way to it.

It's not free. But neither is the cleanup.

---

**Blog Post:**

Whenever someone tells me their team has a quality problem, my first question is always the same: how fast are your builds?

It sounds sideways. But it almost always leads somewhere useful.

Here's what I've observed over the years: the teams that have genuinely cracked automated testing didn't do it because they had a mandate or a policy or even a particularly disciplined culture. They did it because they invested heavily in making tests *fast* and *easy to write*. And once you've done that, the behavior follows naturally. Running tests becomes the path of least resistance, not an extra chore.

Conversely, the teams with slow builds and flaky test suites are the ones where developers skip tests. Not because they're lazy — but because the system punishes them for running tests. A 15-minute build that might fail randomly is not a tool. It's an obstacle.

So before you talk about coverage requirements or QA processes, answer this: can an engineer on your team run the full test suite in under a minute locally? Can a PR trigger a full build and return results before the engineer has had their coffee? Is coverage automatically calculated and reported on every PR without anyone having to ask?

If not, that's the investment. Not headcount. Infrastructure.

And here's what's interesting right now with AI tooling — building that infrastructure has gotten dramatically cheaper. Internal automation tools don't need to be production-grade to be enormously valuable. A one-off script that asserts a key behavior is correct every time is worth more than a backlog ticket that says "add tests" and never gets prioritized. Build the tool, use it, iterate on it.

The engineers I've watched struggle with this usually haven't been exposed to what a well-invested testing environment actually feels like. They've only ever experienced the painful version. So they associate "testing" with "slow and tedious" — and that association is wrong. It's the *implementation* that's slow and tedious. Fix the implementation, and you change the behavior.

You have to invest in it. It's not free. But the cost of the cleanup is never free either — and that bill comes due in the middle of the night, in front of customers, every time.

---
---

## Post 4: Coverage Is Confidence, Not Correctness

**LinkedIn:**

You can hit 100% test coverage and still ship bugs. I've seen it.

Coverage isn't a guarantee. It's a signal.

What it signals is: someone cared enough to verify this works. That care is visible. That confidence is transferable.

That's why I ask for it. Not because it proves correctness — but because it proves intention.

---

**Blog Post:**

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

---
---

## Post 5: Ship the Change, Not the Bundle

**LinkedIn:**

Two-week release cycles feel safe. They're not.

You're bundling two weeks of changes into one deployment. When something breaks, good luck figuring out which change did it.

Ship every change. See if it works. Fix it while the context is fresh.

Batch deployments are a quality nightmare dressed up as a process.

---

**Blog Post:**

In May of 2023 we moved from a structured two-week deployment cadence to hourly deploys. I wrote about it in my year-in-review post, but I want to revisit the *why* — because I've been having this conversation again with teams that are still on the bundled release model and wondering why their quality feels so hard to maintain.

The two-week release cadence has a few specific failure modes that people rarely name directly:

**You're deploying a mystery box.** Two weeks of work from multiple engineers, touching multiple parts of the system, reviewed over different days in different contexts — all deployed at once. When something breaks, you're not debugging a change. You're debugging a bundle. The signal-to-noise ratio is brutal.

**Regression testing becomes a project.** I talked with someone recently whose team spends *two weeks on regression testing*. Two weeks of testing before a two-week cycle of building. That means half the calendar is spent validating the previous half. That's not engineering — that's archaeology.

**Hotfixes expose the lie.** Every team with a two-week release schedule has a hotfix process. That process bypasses the release schedule entirely. Which means you've already decided that when something is important enough, the process doesn't apply. That's not a stable system — that's a system with a known escape hatch that makes the whole structure feel mandatory when it isn't.

The fix isn't complicated, though it does require investment. Feature flags are the enabling technology. When every change is behind a flag, shipping becomes decoupled from releasing. You deploy constantly. You turn things on deliberately. You can inspect a single customer's behavior with the flag on before you roll it out broadly. Production incidents are measured in minutes rather than hours because you know exactly what changed and when.

The mental model shift is: *deployment is a technical event, release is a product decision*. Collapsing those two things is what makes bundled deploys feel necessary. Separating them is what makes continuous deployment feel safe.

Ship the change. See if the system is still healthy — which takes about fifteen minutes if you're watching the right signals. Then move on. If something's wrong, you know exactly what to roll back, the engineer who wrote it is still in context, and nobody is staying up until 2am triaging a deployment that touched thirty things at once.

---
---

## Post 6: PRs Are Conversations, Not Notifications

**LinkedIn:**

The open-source model of pull requests — post it, tag the team, wait — doesn't work for teams that actually know each other.

You know who needs to review your work. Talk to them before you open the PR.

Walk them through the architecture before you've written all the code. Let them poke holes early, when it's cheap to fix.

PRs should be the confirmation of a conversation that already happened. Not the start of one.

---

**Blog Post:**

Here's something I say a lot that usually gets a reaction: *we are not strangers on the internet.*

The open-source PR model — push your work, notify the team, hope someone picks it up, iterate based on comments — makes total sense when contributors don't know each other and are working across time zones and organizations with no shared context. It was built for that. It works great for that.

It does not work great for a team of people who sit (or video call) together every week, have shared context on the codebase, and are accountable to each other for delivery outcomes.

When I watch internal teams use the open-source model, I see a few things consistently:

**PRs get big before anyone looks at them.** The engineer works in isolation until they think the thing is done, then opens a PR with thirty changes. The reviewer now has to reconstruct the entire intent of the work from the diff. This is expensive for the reviewer, and the engineer has already invested too much to pivot meaningfully on structural feedback.

**Reviews become rubber stamps or rabbit holes.** Either the reviewer approves because the thing looks roughly right and they don't want to slow it down — or they find a fundamental problem and now you have a PR comment thread that should have been a twenty-minute conversation three days ago.

**Coverage and quality go sideways late.** By the time someone notices a testing gap or an architectural issue, the engineer is context-switched out and getting back up to speed costs time neither of you wanted to spend.

The model I've had the most success with is straightforward: have the conversation early, stage the review, and use the PR to confirm shared understanding rather than initiate it.

Specifically — if you're working on something that someone else will need to sign off on, loop them in before you start. "I'm going to do this thing. Here's my plan. Any concerns?" Then, at the midpoint, show them the architecture — not the implementation details, just the structure. Names, boundaries, where things live. Get that directional feedback when it's cheap to act on. Then finish the implementation and let the PR be the final confirmation: here's what we talked about, here's what I built, here's the test coverage that says it works.

That process costs the same amount of effort as the open-source model. But it front-loads the hard conversations to the moments when changing course is cheap, and back-loads the formality to the moment when you're actually done.

If the PR fails automated checks — coverage below threshold, build broken, lint issues — it doesn't even need to get to a human. It goes back to the engineer with a clear signal. Fix the basics first. Don't ask me to spend time on work that doesn't meet the baseline.

PRs as conversations, not notifications. It's a small mental shift with a surprisingly large impact on how smoothly a team moves.
