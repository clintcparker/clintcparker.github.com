---
layout: post
title: "Improving Software Team Metrics"
---

A healthy engineering organization (or any healthy team, for that matter) should be tracking itself across a variety of metrics. This seems not to be covered by standard CS curriculum, but is redily encountered in the real world. Once someone is paying for software, there will invariably be questions about how that money is being spent. The most common metrics are bug count and velocity. Followed by automated code coverage. These are common becasue they're the cheapest to produce. Bugs are unfortunately the most visible part of engineering output. Counting them is the start of reducing them. Code coverage is freely available in every modern build pipeline, although not always enabled. And velocity is the treasured metric of any young engineering leader, the end-all answer to thje question "how much work are we getting done!?"

However, once you start looking, there is so much more insight you can gain, and so many more things to track and compare. And, eventually, when you're answering to very clever investors, you'll need to provide the metrics that they value. One of those, which I myslef have come to value, is the sprint completion percentage. This expounds on velocity, and compares that _actual_ value value to the estimated, or planned value. A high velocity is great, but accurate forecasting is even better for the overall business. This metric is easy enough to retrieve. Azure DevOps (ADO) has this baked into it's veloctiy dashboards. The granularity is, obbviously at the sprint level. 

With a little API maginc, we can easily get:



Team | Iteration Path | StartDate | EndDate | Planned | Completed | Completed Late | Incomplete | Total
|----|----------------|-----------|---------|--------:|----------:|---------------:|-----------:|-----:|
Avengers | 21 | 2023-10-10 | 2023-10-23 | 87 | 58 | 0 | 0 | 58
Avengers | 20 | 2023-09-26 | 2023-10-09 | 46 | 38 | 0 | 0 | 38
Avengers | 19 | 2023-09-12 | 2023-09-25 | 51 | 50 | 0 | 0 | 50
X-Men | 21 | 2023-10-10 | 2023-10-23 | 51 | 41 | 0 | 0 | 41
X-Men | 20 | 2023-09-26 | 2023-10-09 | 66 | 79 | 0 | 3 | 79
X-Men | 19 | 2023-09-12 | 2023-09-25 | 18 | 30 | 0 | 0 | 30
Justice League | 21 | 2023-10-10 | 2023-10-23 | 90 | 75 | 0 | 0 | 75
Justice League | 20 | 2023-09-26 | 2023-10-09 | 120 | 121 | 8 | 0 | 129
Justice League | 19 | 2023-09-12 | 2023-09-25 | 108 | 77 | 0 | 0 | 77

The definitions for these states can be found here: https://learn.microsoft.com/en-us/azure/devops/report/dashboards/team-velocity?view=azure-devops&tabs=in-context#state-descriptions-table

We need to do a little more math though for this to become a valuable reporting metric. Unfortunately, the rest of the business, and the investors, don't care about your sprints, they care about monthly and quarterly aggregates.

So, let's start there with the math that rolls up sprints to a monthly value. It's pretty fun. We need to determine what month a sprint falls into. My calculation choses the month that contains more days of the sprint, and if equal, the sprint start.

Team | Iteration Path | StartDate | EndDate | Planned | Completed | Completed Late | Incomplete | Total | Completion % | Month | Year
|----|----------------|-----------|---------|--------:|----------:|---------------:|-----------:|-----:|----:|--:|--:| 
Avengers | 21 | 2023-10-10 | 2023-10-23 | 87 | 58 | 0 | 0 | 58             | 67% | 10 | 2023
Avengers | 20 | 2023-09-26 | 2023-10-09 | 46 | 38 | 0 | 0 | 38  | 83% | 10 | 2023
Avengers | 19 | 2023-09-12 | 2023-09-25 | 51 | 50 | 0 | 0 | 50  | 98% | 9 | 2023
X-Men | 21 | 2023-10-10 | 2023-10-23 | 51 | 41 | 0 | 0 | 41 | 80% | 10 | 2023
X-Men | 20 | 2023-09-26 | 2023-10-09 | 66 | 79 | 0 | 3 | 79 | 120% | 10 | 2023
X-Men | 19 | 2023-09-12 | 2023-09-25 | 18 | 30 | 0 | 0 | 30 | 167% | 9 | 2023
Justice League | 21 | 2023-10-10 | 2023-10-23 | 90 | 75 | 0 | 0 | 75 | 83% | 10 | 2023
Justice League | 20 | 2023-09-26 | 2023-10-09 | 120 | 121 | 8 | 0 | 129 | 108% | 10 | 2023
Justice League | 19 | 2023-09-12 | 2023-09-25 | 108 | 77 | 0 | 0 | 77 | 71% | 9 | 2023


Aggregating these values can be done in a few different ways. We're combining teams and sprints to get a monthly representation fo the group as a whole. I've found 4 reasonable ways to calculate this value across teams and sprints:
- basic average
- weighted average
- unweighted average
- "inverted"

basic average
The most basic average. This would be the average of all the values for the `Completion %` column for a given month and year. While this is a very easy value to calculate, I've found it gives too much weight to the individual sprints. Example, one bad sprint, even with a minimal planned value, can drastically change this calculation.

unweighted
This is the sum of the `Total` column divided by the sum of the `Planned` column for a given month and year. This gives too little weight to individual sprints and doesn't address the discrepancies of point values across teams.

weighted
This has been my go-to calculation for years. This is a two phased calculation. First, we roll up the value for the individual teams. We do this with the unweighted model, but filter by team in addition to month and year. Then, we average those values. This handles a team having a bad sprint, but recovering in the next, as well as the  differences in point values.


But what about team B? they didn't get all that work done. It doesn't feel like the numbers represent the reality if the work not getting done was high value / high vis. The 1st phase of the weighted model allows for a bad sprint. And if the team is working ahead or catching up, we're sweeping that bad sprint under the rug. And while this hadn't always directly worried me, my colleagues that had been expecting certain things, and not seeing them delivered despite the 100%+ completion rates, were getting a little frustrated. 

So I've come up with a new number to properly represent just that, how much work _aren't_ we getting done every month.

"Inverted"
inverted" may be more representative of the commitment to the business. It shows if we did what we committed to, but discounts the value of above and beyond work. This calculationhas a maximum of 100%. The calculation is multi-phased. The first phase is the same as weighted. Then we "invert" the monthly team values. If the number is less that 100%, we report the difference, else we report 0. Next, we average those shortfall percentages. And finally, we subtract that value from 100%. 

The inverted value is mofre more represtentative of our accountability to the business. It should be noted, that this value doesn't fully neglect above and beyond work, but severely discounts it. Namely, when the X-Men go above and beyond, it now won't outweigh the shortcomings of the Avengers that month.


