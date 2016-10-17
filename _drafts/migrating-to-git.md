---
layout: post
title: "Migrating to Git"
---

### Summary

Moving to git has never been considered a simple task at MB. However, I believe
we have good strategy to accomplish this with minimal impact or downtime.

### Outline

#### Test assumptions
  * I would consider this aspect done.
  * We tested many assumptions for this: history migration, build migration,
  tooling installations, training, deployment.

#### Learn git
1. Become experts(?)
  * I would say we've come far enough.
  * We already have several git experts at this company, and it is one of the
    most documented products I have ever used. I feel that going into this, I,
    and Bernie, had a strong understanding of git's capabilities. I would also
    like to note that over the years we have also become an expert in TFVC.
  * We still spent numerous hours going through git trainings and researching
    and documenting how git works with TFS and VisualStudio.
2. Train the trainers
  * (mostly done)
  * We have given enough focused training to make our users as good or better
  with git in VisualStudio as they presently are with TFVC. We have specif

#### Transfer all history
* This has been started for some repositories.
* The time costs are understood for this migration.
* This will need to be completed prior to migration.
* We will need to refresh the histories at the last minute prior to migration.

#### Switch over builds
* Last step of actual migration.
* Could be done in place, or builds could be cloned and marked as `*_git`
* Convert build tools to use git hashes instead of changeset numbers.
    * This has been built but not implemented.

#### Allow non-dev testers to access features in branches
* Currently in development

#### Start using Pull Requests
* depending on your view this is
  * :(
* OR
  * :)
