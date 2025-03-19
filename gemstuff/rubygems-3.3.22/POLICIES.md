## Pull Requests

Contributions to RubyGems are made via GitHub pull requests, which must be
approved by a project committer other than the author. To approve a PR, a
maintainer can use GitHubs PR review feature. After that, if the original author
is happy to merge the PR, she can press the merge button.

## Long-Term Support

RubyGems will support Ruby versions for as long as the Ruby team supports that
Ruby version. That means that the latest RubyGems release will always support
the currently-supported Ruby versions, and RubyGems security fixes will be
released for any RubyGems version that shipped inside a currently-supported
Ruby version.

### Bugfix Releases

RubyGems generally releases bugfixes from the master branch. We may mix bug
fixes and new features in the same release. RubyGems does not guarantee it
will ship bugfix releases for previous minor or major versions.

For example, after RubyGems 2.5 is released, the RubyGems team will not
provide non-security fixes for RubyGems 2.4, or any earlier versions.

### Security Releases

Security releases will be made for RubyGems minor versions that were included
in a currently-supported Ruby release.

For example, since RubyGems 2.0 was shipped in Ruby 2.0, RubyGems 2.0 will
receive security fixes until Ruby 2.0 reaches end-of-life.

### Ruby Version Support

When a Ruby version reaches end-of-life the following minor release of
RubyGems will drop backwards compatibility with that Ruby version.

For example, since Ruby 2.2 has reached end-of-life, future RubyGems minor
releases will only support Ruby 2.3 and above. As of this writing RubyGems is
at version 2.7, so when RubyGems 2.8 is released, it will only support Ruby
2.3 and later.

## Release Process

Releases of new versions should follow these steps, to ensure the process is
smooth and no needed steps are missed.

### Recommendations for security releases

*   Obtain CVE numbers as needed from HackerOne or Red Hat.
*   Agree on a release date with ruby-core, so patches can be backported to
    older Ruby versions as needed.
*   Avoid releasing security updates on Fridays, so platform services don't
    have to work on weekends.
*   Continue with the regular release process below.


### Steps for patch releases

*   Confirm all PRs that you want backported are properly tagged with `rubygems:
    <type>` or `bundler: <type>` labels at GitHub.
*   Run `rake prepare_release[<target_version>]`, create a PR and merge it
    to the stable branch once CI passes.
*   Switch to the stable branch and pull the PR just merged.
*   Release `bundler` with `(cd bundler && bin/rake release)`.
*   Release `rubygems` with `rake release`.

### Steps for minor and major releases

*   Confirm all PRs that you want listed in changelogs are properly tagged with
    `rubygems: <type>` or `bundler: <type>` labels at GitHub.
*   Run `rake prepare_release[<target_version>]`.
*   Add the new stable branch `x.y` where `x.y` are the first two components of
    the rubygems version being released to the CI workflows as an extra commit
    on top of what the `prepare_release` task generated.
*   Create a PR to the main branch, and merge it once CI passes.
*   From the main branch, cut a new stable branch with `git pull && git checkout
    -b x.y`.
*   Push the stable branch and wait for CI to be green.
*   Release `bundler` with `(cd bundler && bin/rake release)`.
*   Release `rubygems` with `rake release`.

## Committer Access

RubyGems committers may lose their commit privileges if they are inactive for
longer than 12 months. Committer permission may be restored upon request by
having a pull request merged.

This is designed to improve the maintainability of RubyGems by requiring
committers to maintain familiarity with RubyGems activity and to improve the
security of RubyGems by preventing idle committers from having their commit
permissions compromised or exposed.

## Changing These Policies

These policies were set in order to reduce the burden of maintenance and to
keep committers current with existing development and policies. RubyGems work
is primarily volunteer-driven which limits the ability to provide long-term
support. By joining [Ruby Together](https://rubytogether.org) you can help
extend support for older RubyGems versions.
