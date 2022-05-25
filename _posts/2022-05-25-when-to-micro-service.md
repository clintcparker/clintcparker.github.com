---
layout: post
title: "When to Microservice"
date: 2022-05-25T14:52:58-07:00
---

I'm enjoying Microsoft Build 2022. Developer experience (especially in the face of common and complicated IaaS and PaaS scenarios) was my favorite topic of the day 1 keynotes.

Later, watching the keynote after hours, I stumbled on a gem of a conversation between Scott Hanselman and Scott Guthrie.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Great informal discussion/perspective on when to use micro-services &amp; containers from <a href="https://twitter.com/shanselman?ref_src=twsrc%5Etfw">@shanselman</a> and <a href="https://twitter.com/scottgu?ref_src=twsrc%5Etfw">@scottgu</a> at 33:18.<a href="https://t.co/1tNahY1VSk">https://t.co/1tNahY1VSk</a></p>&mdash; Clint Parker (@clintcparker) <a href="https://twitter.com/clintcparker/status/1529577253423566848?ref_src=twsrc%5Etfw">May 25, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Lot's of classic "it depends" which is totally true. For me it depends on at least one of three macro factors being present:

1. Teams/people need to develop and deploy at different paces.
2. Parts of the system _need_ to scale independently
3. Parts of the system _need_ to be segmented for security purposes. Ex: only engineers from the payments team can make changes to payments systems.

You can have any decomposition you like, but in that video Scott Guthrie alludes to the challenges you can face on either end of the spectrum (1 engineer with 100 micro-services or 100 engineers with one service).

One last note, I may start saying containers instead of micro-services going forward. I usually try say that I prefer macro-services, but then we have to have a whole discussion about the difference. Maybe the term container will become the defacto descriptor of services and their boundaries.

