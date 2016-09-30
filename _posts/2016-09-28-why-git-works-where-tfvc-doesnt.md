---
layout: post
title: "Why Git Works Where TFVC Doesn't"
date: 2016-09-28T15:29:00-07:00
---

We're in the process of moving to git right now, and one of the main questions I get is how will this ACTUALLY be any better than TFVC. (The other question is how much longer before we're fully moved to git? Which warrants its own piece.)

See, we've tried "branching" in TFVC, and it only caused us more pain. So there is some legitimacy to this question.

We were doing some hard core bastardized scrum, and had successfully split our department into scrum teams. Who would work on all kinds of stuff each sprint. Maybe half the team was working on a global refactoring of a pattern, maybe the other was working on migrating some  key workflows from our old static classes to new workflows leveraging dependency injection. Either way, different work with different timeframes.

Because we're agile, we need to be able to work on lots of different things at any given time. But branching in TFVC is different than it is in git. A branch in TFVC is immediately available to everybody to see. And it never really goes away, but you can hide it (cool!). But you can't use that name again (bummer). 

Since it never goes away, and we didn't want to be constantly reminded of our bad branch naming, we picked a very generic naming scheme. Git branching would say be specific with you're development branch names. But ours were Work-1, Work-2, .etc. We had about 10 teams at that point, and we ended up with 32 "work" branches.

Ok, 32, not too bad. But it was. 32 is not enough for the number of features & bug fixes being developed by 10 (and growing) teams. We probably needed 100-500 to have actually been successful. But with generic names like work-2, it's hard to keep track of ownership. So we stopped at 32. 

And this is where it got messy.

Scenario: The team is working on three different things in Work-14. One is done, while two are in progress. That whole branch has to be brought in now. Because that one completed feature is made up of 100 different changesets over six weeks. So we can't just cherry pick that one feature. And now we've brought in two half-done features into mainline. We're constantly testing mainline, so we feel OK about this, but the reality is that it's not mainline that causes the problem. 
Another team just got two half done projects dumped into their branch, because they rebased from mainline. And not just one other team, but nine. And then they're all propagating that back out to everybody else. 

In the end, the chaos comes from the unfinished work being forced into everybody's "clean" branches. But we're actually paying extra for that chaos, because we now have to constantly rebase and merge branches, which takes time and understanding of a myriad of incongruent changes.

Earlier I said we've "tried" branching. We did. And then we abandoned it. We still have the chaos, but not the extra cost. Everybody commits to mainline, it is constantly under test, and we ship often. Builds break, and it affects everybody, but it gets resolved quickly. 

I'm of the belief that is has made our developers better, knowing the impact of a bad commit. But it isn't easy.

So we're switching to git. And we can have as many branches as we want. And they can be local. And they can have good names. And they can be deleted. And we can still commit to mainline if we want to.
