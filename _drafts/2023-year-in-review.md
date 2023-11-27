---
layout: post
title: "2023 Year in Review"
---
ClockShark has seen a lot of changes in the last year. On the engineering side, I'd like to focus on the changes that we've introduced or adopted.

Structured Teams.

Initially we had one team of 12 one team of 5 and one team of 2 with QA floating across teams
Now we have 3 evenly sized and staffed teams.

Job Descriptions
I kn ow the engineering team had been working on some ,job description/ job matrices, but they never quite made it to fruition. Engineering leadership created measureable job expectations for softweare negineering levels 1-4.
this gives clarity to both our team members and managers.

Feature Flags
We started to introduce the concept of flags in late 2022 but didn't adopt them until 2023. We've rewritten the framework a few time. We've introduced XXXX falgs in 2023. all of which has led to...

Deploying multiple times / day
In may of 2023 we moved to hourly deploys. We had previously been on a structured 2 week deployment cadence. chalenges w/ 2 wekk cadence: maintianing the "release branch", being beholden to release schedule and work done or not done in time, and the fact that we were deploying 2 weeks of work at a time, hotfixes bypassing all the process. We've since moved to daily deploys. We've also moved to a more automated testing process.

increased automated testing
In August we increased our expectatins around automated testing. We're now over 30% total line coverage for all of our codebases. We've also introduced a new testing framework that allows us to test our frontend code in a more automated fashion.

latest .net
In 2022, Clockshark migrated to dotnet 6. In 2023 we've migrated to dotnet 7. 

Running on linux in prod
In 2023 we migrated our production servers to linux. In 2023 we've migrated our dev and staging servers to linux. We've also migrated our build servers to linux.

hosting savings
In 2023 we've saved over $100k in hosting costs by migrating to linux and moving our WAF to cloudflare.

DDOS protection
In 2023 we've moved our WAF to cloudflare. This has given us DDOS protection and a CDN.

codified SDLC
in 2022, our SDLC was very loose and ad-hoc. In 2023 we've codified our SDLC.

consistent meeting schedule
In 2022, we had a very loose meeting schedule. In 2023 we've codified our meeting schedule.

opened up bug reporting to everyone
In May of 2023, we opened up our bug reporting process to the whole clockshark internal team. We previously had two processes, and an issue had to be verified an dtriaged before it was added to the bug backlog. This limited visibility into the bug backlog and also skewed reporting.

WasM / frontend testing
In 2023 we've introduced a new testing framework that allows us to test our frontend code in a more automated fashion. We've also introduced a new frontend framework that allows us to write our frontend code in a more maintainable fashion.

consistent metric reporting


Stuff we didn’t have:
- Structured teams
- Job descriptions
- Feature flags
- Deploying multiple times / day
- increased automated testing
- latest .net
- running on linux in prod
- hosting savings
- DDOS protection
- codified SDLC
- consistent meeting schedule
- opened up bug reporting to everyone
- WASM / frontend testing
- consistent metric reporting