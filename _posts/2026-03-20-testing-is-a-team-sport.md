---
layout: post
title: "Testing Is a Team Sport"
date: 2026-03-20T17:29:54+00:00
---

I've had some version of this conversation with multiple engineering leaders lately, and I keep landing in the same place: **quality is a team sport, and most teams haven't figured that out yet.**

Here's the dynamic I see a lot. You've got developers who write their code, write their tests (maybe), and hand the whole thing off. Somewhere downstream, a tester or QA person picks it up and starts poking holes. When they find something, it goes back. When they don't, it ships. Everyone's doing their job. And yet somehow, bugs still make it to production, morale is still low, and the whole thing feels slower than it should.

The problem isn't the people. The problem is the model.

Separating "building" from "quality" creates distance — between the person who knows the most about how something was constructed and the process of verifying that it works correctly. That distance is where bugs hide.

The fix isn't to hire more testers. It's to collapse that distance. Make the people accountable for delivery also accountable for correctness. Pair them up. If two engineers worked on a feature together, they're both on the hook if it breaks. Not "well, they were supposed to test it." No. Both of them own it.

What I've seen work is building that expectation into the culture from the top. Not as a punitive thing, but as a shared ownership thing. _*We*_ built it. _*We*_ stand behind it. If it's wrong, we fix it, we learn from it, and we make sure it doesn't happen that way again.

The corollary to this is that no single person (or department) in an org should carry "quality" as their sole responsibility. One QA lead against a team of fifteen engineers is not a quality strategy. It's a bottleneck with a job title. The engineerings and their leadership (the people accountable for delivery) also have to be accountable for what they deliver working correctly. That's not a radical idea. It's just engineering maturity.

Quality isn't a department. It's an expectation.