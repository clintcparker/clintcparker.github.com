---
layout: post
title: "Improving Software Team Metrics"
---

A healthy engineering organization (or any healthy team, for that matter) should be tracking itself across a variety of metrics. This seems not to be covered by standard CS curriculum, but is redily encountered in the real world. Once someone is paying for software, there will invariably be questions about how that money is being spent. The most common metrics are bug count and velocity. Followed by automated code coverage. These are common becasue they're the cheapest to produce. Bugs are unfortunately the most visible part of engineering output. Counting them is the start of reducing them. Code coverage is freely available in every modern build pipeline, although not always enabled. And velocity is the treasured metric of any young engineering leader, the end-all answer to thje question "how much work are we getting done!?"

However, once you start looking, there is so much more insight you can gain, and so many more things to track and compare. And, eventually, when you're answering to very clever investors, you'll need to provide the metrics that they value. One of those, which I myslef have come to value, is the sprint completion percentage. This expounds on velocity, and compares that _actual_ value value to the estimated, or planned value. A high velocity is great, but accurate forecasting is even better for the overall business. This metric is easy enough to retrieve. Azure DevOps (ADO) has this baked into it's veloctiy dashboards. The granularity is, obbviously at the sprint level. Unfortunately, the rest of the business, and the investors, don't care about your sprints, they care about monthly and quarterly aggregates.

So, let's start there with the math that rolls up sprints to a monthly value. It's pretty fun.


Now that we have that, we can see that we're fairly consistently coming in over 100%. Go team! And its true, team A did all of their original work, and then some!

But what about team B? they didn't get all that work done. It doesn't feel like the numbers represent the reality if the work not getting done was high value / high vis.

So I've come up with a new number to properly represent just that, how much work _aren't_ we getting done every month.