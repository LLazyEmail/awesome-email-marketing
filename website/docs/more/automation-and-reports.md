---
title: "Automation and reports"
description: "GitHub Actions workflows and reports that keep the Awesome Email Marketing list and docs site in sync."
keywords:
  - github actions
  - documentation-actions
  - ci
  - awesome email marketing
sidebar_label: "Automation and reports"
sidebar_position: 7
image: img/docusaurus-social-card.jpg
hide_title: false
hide_table_of_contents: false
toc_min_heading_level: 2
toc_max_heading_level: 3
draft: false
unlisted: false
category: more
topics:
  - more
audience:
  - maintainers
seo:
  title: "Automation and reports | Awesome Email Marketing"
  description: "GitHub Actions workflows and reports that keep the Awesome Email Marketing list and docs site in sync."
  robots: index,follow
  canonical_path: "/docs/more/automation-and-reports"
  og_type: article
  twitter_card: summary_large_image
---

# Automation and reports

Every workflow lives in [`.github/workflows/`](https://github.com/LLazyEmail/awesome-email-marketing/tree/main/.github/workflows). Most call shared reusable workflows from the [`LLazyEmail/documentation-actions`](https://github.com/LLazyEmail/documentation-actions) repository (DA); `@v2` pins a DA release, `@main` follows DA's main branch. Where DA publishes a short-name alias (see [DA naming](https://github.com/LLazyEmail/documentation-actions/blob/main/docs/naming.md)), the caller uses that name and keeps the same pin. The alias accepts the same inputs as the long name.

## Where to find the reports

| Report | Where it shows up | When | Workflow |
| --- | --- | --- | --- |
| **Link check report** | One open issue titled *Link check report (lychee)*, updated in place each run instead of a new issue per week | Mondays 09:00 UTC, or run it by hand | `link-check.yml` |
| **Open PRs status report** | One open issue titled *Open PRs status report* (label `pr-status-report`) with a table of every open PR, its author, merge state and last update; the issue body is replaced on each run | Mondays 08:00 UTC, or run it by hand | `open-prs-status-report.yml` |
| **Conflicted PRs** | The `has-conflicts` label on each PR that conflicts with `main`; removed once it's resolved | Every 4 hours and on every push to `main` | `label-conflicted-prs.yml` |
| **Auto-rebase summary** | The workflow run's summary page: one line per PR (updated, skipped and why, or failed with the conflicting files) | Every 6 hours, or run it by hand | `auto-rebase-prs.yml` |

A red *Auto-rebase open PRs* run usually means one PR has a real conflict (the summary names it and the files). Fix that PR by hand or run the workflow with its number and `rebase-conflicts: true`; the other PRs were still processed.

**Contributor PRs from forks** can't be rebased in place, because the workflow can't push to someone else's fork. When one conflicts, the workflow opens a new draft PR from `supersede/pr-<N>` instead. Its body starts with `Supersedes #N`, it credits the contributor as co-author, and it gets a link comment on the original. Two PRs adding entries to the same list are merged automatically, keeping both entries. Anything else gets a comment on the original PR asking for a person. Merge the new PR, and *Close superseded PRs* closes the original with a thank-you. Example: PR #446 superseded contributor PR #421.

## All workflows

| Workflow | File | Runs on | What it does |
| --- | --- | --- | --- |
| Test deployment | `test-deploy.yml` | PRs | Builds the Docusaurus site in `website/` (after `npm run lint:docs-links`) so broken pages fail the PR. Calls DA `reusable-test-deploy`. |
| Build images | `build-images.yml` | PRs, manual | Builds the site and checks that every image it references exists. Calls DA `reusable-image-check`. |
| Markdown lint | `markdown-lint.yml` | PRs and pushes touching Markdown | markdownlint on `README.md`, `CHANGELOG.md` and `website/docs/**`. |
| Link check | `link-check.yml` | PRs, Mondays, manual | lychee on the README, changelog and docs, using `.lychee.toml`; site-relative `/docs/...` links resolve against `website/`. Scheduled and manual runs write the report issue above. |
| Awesome list entry format check | `awesome-entry-format-check.yml` | PRs | Adds a warning annotation for changed list entries that are missing the ` - description` part. Doesn't fail the PR. Calls DA `reusable-entry-format`. |
| README ↔ Docs sync check | `readme-docs-sync-check.yml` | PRs | Fails when a link is added to `README.md` but not to the matching `website/docs` page (see the README → docs map in `AGENTS.md` and [CONTRIBUTING.md](https://github.com/LLazyEmail/awesome-email-marketing/blob/main/CONTRIBUTING.md)). Its own comment is off; *Docs sync feedback* explains the fix. Calls DA `reusable-readme-sync`. |
| Docs sync feedback | `docs-sync-feedback.yml` | PRs touching `README.md` or docs, including forks (`pull_request_target`); manual with a PR number | When a PR adds an entry to `README.md` but not to the docs page, adds the `needs-docs-sync` label and one comment naming the docs file, section and exact line to add. Later pushes edit that comment. Once in sync, the label is removed and the comment says resolved. Replaces the old *Comment on README-only PRs* workflow, which couldn't comment on fork PRs. Calls DA `reusable-sync-feedback` (no short alias). |
| Star request comment | `star-request.yml` | Newly opened PRs, including forks (`pull_request_target`) | Comments thanking the contributor and asking for a ⭐. |
| Auto-rebase open PRs | `auto-rebase-prs.yml` | Every 6 h, manual | Updates PR branches that are behind `main`; conflicting PRs are reported, not force-pushed, unless `rebase-conflicts` is set. Conflicting fork PRs get a superseding PR (`supersede/pr-N`, "Supersedes #N"). |
| Close superseded PRs | `close-superseded-prs.yml` | A PR is merged (`pull_request_target`, no code checkout) | Closes every PR named in the merged PR's `Supersedes #N` line, with a thank-you comment. |
| Label conflicted PRs | `label-conflicted-prs.yml` | Every 4 h, push to `main`, manual | Adds or removes `has-conflicts`. Calls DA `reusable-label-conflicts`. |
| Open PRs status report | `open-prs-status-report.yml` | Mondays, manual | Writes the status report issue. Calls DA `reusable-pr-report`. |
| Update changelog | `changelog.yml` | Push to `main` | Regenerates `CHANGELOG.md` and `website/src/data/changelog.json` and commits them. |
| Update docs pages index | `docs-index.yml` | Push to `main` touching docs | Regenerates `website/docs/pages-index.md` and `website/static/api/v1/docs-pages.json`. |
| Update industry-leaders articles API | `industry-leaders-api.yml` | Push to `main` touching that data | Regenerates `website/static/api/v1/industry-leaders.json`. |
| Deploy to GitHub Pages | `deploy.yml` | Push to `main` touching the site | Builds `website/` and publishes it to GitHub Pages. |

The bot commits from *Update changelog*, *Update docs pages index* and *Update industry-leaders articles API* are expected; don't edit those generated files by hand.
