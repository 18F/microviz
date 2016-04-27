## Welcome!

We're so glad you're thinking about contributing to an 18F open source project!
If you're unsure about anything, just ask -- or submit the issue or pull request
anyway. The worst that can happen is you'll be politely asked to change
something. We love all friendly contributions.

We want to ensure a welcoming environment for all of our projects. Our staff
follow the [18F Code of
Conduct](https://github.com/18F/code-of-conduct/blob/master/code-of-conduct.md)
and all contributors should do the same.

We encourage you to read this project's CONTRIBUTING policy (you are here), its
[LICENSE](LICENSE.md), and its [README](README.md).

If you have any questions or want to read more, check out the [18F Open Source
Policy GitHub repository]( https://github.com/18f/open-source-policy), or just
[shoot us an email](mailto:18f@gsa.gov).

## Instructions for Contributors

There are a few specific requirements that your pull requests must follow to be
accepted into the project

### Testing and Style Compliance

We believe in a test-driven approach for this project and any new features must
include corresponding tests. We use the
[Jasmine](http://jasmine.github.io/) framework to unit test

### Our Git Branching Philosophy

We are following a variant of the standard [git
flow](http://nvie.com/posts/a-successful-git-branching-model/) approach for
handling git branches. This means there are two main branches in the repository:

* `master` - stable code deployed to production
* `develop` - code in development that is periodically released to production site

Unlike git flow, there is no requirement to prefix any of your branches with
type strings like `feature/` or `hotfix/`, but you **must** submit any pull
request against the `develop` branch. Pull requests against `master` will be
rejected.

### Federalist

The site is managed with [Federalist](https://federalist.18f.gov). Docs for Federalist can be found [here](https://federalist-docs.18f.gov/)

One of Federalist's coolest features is [Draft Previews](https://federalist-docs.18f.gov/pages/using-federalist/#managing-site-settings/). This allows any branch of the registered repo to be viewable with a preview link. So instead of asking people to run the app locally or being forced to merge to develop or staging branches, we can instead view a Microviz branch, `some-branch`, like so:

```https://federalist.18f.gov/preview/18F/microviz/some-branch/```

## Public domain

This project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.
