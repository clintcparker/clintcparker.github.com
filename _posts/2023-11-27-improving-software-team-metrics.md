---
layout: post
title: "Improving Software Team Metrics"
date: 2023-11-27T11:30:46-08:00
---

A healthy engineering organization (or any healthy team, for that matter) should be tracking itself across a variety of metrics. This is not covered by the standard CS curriculum but is readily encountered in the real world. Once someone is paying for software, there will invariably be questions about how that money is being spent. The most common metrics are bug count and velocity. Followed by automated code coverage. These are common because they're the cheapest to produce. Bugs are, unfortunately, the most visible part of engineering output. Counting them is the start of reducing them. Code coverage is freely available in every modern build pipeline, although not always enabled. And velocity is the treasured metric of any young engineering leader, the end-all answer to the question “How much work are we getting done!?"

However, once you start looking, there is so much more insight you can gain and so many more things to track and compare. And, eventually, when you're answering to very clever investors, you'll need to provide the metrics that they care about. One of those, which I have come to appreciate, is the sprint completion percentage. This expounds on velocity and compares that _actual_ value to the estimated or planned value. A high velocity is excellent, but accurate forecasting is even better for the overall business. This metric is easy enough to retrieve. Azure DevOps (ADO) has this baked into its velocity dashboards. The granularity is obviously at the sprint level.

With a little API magic, we can easily get:



Team    | Iteration Path | StartDate | EndDate | Planned | Completed | Completed Late | Incomplete | Total
|:----| :--------: |  :------: | :----:|--------:|----------:|---------------:|-----------:|-----:|
Avengers | 21 | 2023-10-10 | 2023-10-23 | 87 | 58 | 0 | 0 | 58
Avengers | 20 | 2023-09-26 | 2023-10-09 | 46 | 38 | 0 | 0 | 38
Avengers | 19 | 2023-09-12 | 2023-09-25 | 51 | 50 | 0 | 0 | 50
X-Men | 21 | 2023-10-10 | 2023-10-23 | 51 | 41 | 0 | 0 | 41
X-Men | 20 | 2023-09-26 | 2023-10-09 | 66 | 79 | 0 | 3 | 79
X-Men | 19 | 2023-09-12 | 2023-09-25 | 18 | 30 | 0 | 0 | 30
Justice League | 21 | 2023-10-10 | 2023-10-23 | 90 | 75 | 0 | 0 | 75
Justice League | 20 | 2023-09-26 | 2023-10-09 | 120 | 121 | 8 | 0 | 129
Justice League | 19 | 2023-09-12 | 2023-09-25 | 108 | 77 | 0 | 0 | 77

The definitions for these states can be found [here](https://learn.microsoft.com/en-us/azure/devops/report/dashboards/team-velocity?view=azure-devops&tabs=in-context#state-descriptions-table).

We need to do a little more math, though, for this to become a valuable reporting metric. Unfortunately, the rest of the business and the investors don't care about your sprints; they care about monthly and quarterly aggregates.

So, let's start there with the math that rolls up sprints to a monthly value. It's pretty fun. We need to determine what month a sprint falls into. My calculation chooses the month that contains more days of the sprint, and if it is equal, the sprint starts.

Team | Iteration Path | StartDate | EndDate | Planned | Completed | Completed Late | Incomplete | Total | Completion % | Month | Year
|:----| :--------: |  :------: | :----:|--------:|----------:|---------------:|-----------:|-----:|----:|--:|--:| 
Avengers | 21 | 2023-10-10 | 2023-10-23 | 87 | 58 | 0 | 0 | 58             | 67% | 10 | 2023
Avengers | 20 | 2023-09-26 | 2023-10-09 | 46 | 38 | 0 | 0 | 38  | 83% | 10 | 2023
Avengers | 19 | 2023-09-12 | 2023-09-25 | 51 | 50 | 0 | 0 | 50  | 98% | 9 | 2023
X-Men | 21 | 2023-10-10 | 2023-10-23 | 51 | 41 | 0 | 0 | 41 | 80% | 10 | 2023
X-Men | 20 | 2023-09-26 | 2023-10-09 | 66 | 79 | 0 | 3 | 79 | 120% | 10 | 2023
X-Men | 19 | 2023-09-12 | 2023-09-25 | 18 | 30 | 0 | 0 | 30 | 167% | 9 | 2023
Justice League | 21 | 2023-10-10 | 2023-10-23 | 90 | 75 | 0 | 0 | 75 | 83% | 10 | 2023
Justice League | 20 | 2023-09-26 | 2023-10-09 | 120 | 121 | 8 | 0 | 129 | 108% | 10 | 2023
Justice League | 19 | 2023-09-12 | 2023-09-25 | 108 | 77 | 0 | 0 | 77 | 71% | 9 | 2023




Aggregating these values can be done in a few different ways. We're combining teams and sprints to get a monthly representation for the group as a whole. I've found four reasonable ways to calculate this value across teams and sprints:
- Basic Average
- Unweighted Average
- Weighted Average
- "Inverted"

#### Basic Average
The most basic average. This would be the average of all the values for the `Completion %` column for a given month and year. While this is a straightforward value to calculate, I've found it gives too much weight to the individual sprints. For example, one lousy sprint, even with a minimal planned value, can drastically change this calculation.

#### Unweighted
This is the sum of the `Total` column divided by the sum of the `Planned` column for a given month and year. This assigns too little weight to individual sprints and doesn't address the discrepancies in point values across teams.

#### Weighted
This has been my go-to calculation for years. This is a two-phased calculation. First, we roll up the value for the individual teams. We do this with the unweighted model but filter by `Team` in addition to month and year. Then, we average those values. This handles a team having a lousy sprint but recovering in the next, as well as the differences in point values.


But what about team B? They didn't get all that work done. It doesn't feel like the numbers represent the reality if the work not getting done was high value / high vis. The 1st phase of the weighted model allows for a disappointing sprint. And if the team is working ahead or catching up, we're sweeping that bad sprint under the rug. While this hadn't always directly worried me, my colleagues who had been expecting certain things and not seeing them delivered despite the 100%+ completion rates were getting a little frustrated. 

So I've come up with a new number to properly represent just that: how much work _we aren't_ getting done every month.

#### "Inverted"
"Inverted" may be more representative of the commitment to the business. It shows if we did what we committed to but discounts the value of above and beyond work. This calculation has a maximum of 100%. The calculation is multi-phased. The first phase is the same as weighted. Then, we “invert" the monthly team values. If the number is less than 100%, we report the difference; otherwise, we report 0. Next, we average those shortfall percentages. And finally, we subtract that value from 100%.

The inverted value is more representative of our accountability to the business. It should be noted that this value doesn't entirely neglect above and beyond work but severely discounts it. Namely, when the X-Men go above and beyond, it won't outweigh the shortcomings of the Avengers that month.


#### Conclusion
Tracking software team metrics is an essential aspect of maintaining a healthy engineering organization. While common metrics such as bug count and velocity provide a basic understanding of team performance, they often fall short in providing a comprehensive view of the team's efficiency and productivity. This article has explored the concept of sprint completion percentage as a more insightful metric, offering a comparison of actual work done against planned work. 

In essence, the choice of metric and calculation method should align with the team's objectives and the expectations of stakeholders. By adopting a more nuanced approach to tracking software team metrics, organizations can gain deeper insights into team performance, improve forecasting accuracy, and ultimately drive better business outcomes.