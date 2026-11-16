# AGENTS.md — guide for AI coding agents

This repository is the **LLazyEmail/awesome-email-marketing** curated list of email marketing resources, with a Docusaurus site under `website/`.

Sister projects: [awesome-newsletters](https://github.com/LLazyEmail/awesome-newsletters) and the main [documentation](https://github.com/LLazyEmail/documentation) site.

## Do

- Prefer **small, single-purpose PRs** (one concern each). Most contributions are one-line additions to lists.
- Keep existing curated content. Extend, annotate, or archive — do not delete wholesale.
- Open PRs as **drafts** against `main` unless a human asks otherwise.
- Include the trailer `Co-authored-by: petroved <arthur.tkachenko.netweight@gmail.com>` on commits when working for Arthur Tkachenko / petroved.
- When adding a resource, update **both** the root `README.md` and the matching page under `website/docs/` so the published site stays in sync.
- Always return **full GitHub links** (e.g. `https://github.com/LLazyEmail/awesome-email-marketing/pull/123`) when reporting on issues or pull requests — never only bare numbers.

## Don’t

- Don’t merge or close PRs unless explicitly asked by the owner.
- Don’t commit secrets.
- Don’t run destructive git history rewrites on `main`.
- Don’t add duplicate copies of shared workflows; those live in [documentation-actions](https://github.com/LLazyEmail/documentation-actions).

## PR hygiene

These rules keep PRs from conflicting and mean nobody has to ask for rebases or cleanup. Full checklist: [documentation-actions `skills/pr-hygiene`](https://github.com/LLazyEmail/documentation-actions/blob/main/skills/pr-hygiene/SKILL.md).

1. **Same file → same PR.** Most PRs here touch `README.md` and a `website/docs/` page. Do not open a second PR that edits a file another open PR already edits. Add to that PR, or wait until it merges.
2. **`Merge after #X` first.** A PR that depends on another starts its body with `Merge after #X`.
3. **`Closes #N` on combined PRs.** When several PRs are folded into one, list each replaced PR as `Closes #N` so GitHub closes them on merge. Keep the original authors' `Co-authored-by` (GitHub noreply) trailers.
4. **Don't push to `main`, merge, or create tags or releases by hand.** Ask the owner before force-pushing any PR branch.
5. **No fake secrets.** If automation needs a token, name the secret the owner must add.

## Rebases

1. First use [`auto-rebase-prs.yml`](.github/workflows/auto-rebase-prs.yml). Dispatch it with `pr-numbers` (and `rebase-conflicts: true` only with the owner's approval).
2. In `rebase-conflicts` mode the workflow skips PRs that already contain `main` ("already up to date"), and with `merge-fallback: true` (set in the workflow) it does a normal merge update when the rebase conflicts but GitHub says the PR is mergeable. Only a PR GitHub reports as not mergeable still fails.
3. Fall back to a manual rebase only if the workflow cannot resolve the conflicts.
4. Never push a rebase that makes a branch identical to `main`; GitHub auto-closes the PR.

## Dependencies and CI

- Dependabot opens one grouped PR per week per group (see [`.github/dependabot.yml`](.github/dependabot.yml)).
- A PR is ready only when its checks are green. Fix red checks in the same PR, or explain them in the PR body. Never disable a check to get green.
- An optional AI-fix step (only when a rebase conflicts or a check goes red) is a design note in [documentation-actions `docs/ai-fix-step.md`](https://github.com/LLazyEmail/documentation-actions/blob/main/docs/ai-fix-step.md). It is not enabled here.

## Layout

- `README.md` — the canonical awesome list
- `website/` — Docusaurus site (docs under `website/docs/`)
- `website/docs/tools/` — tool category pages that mirror sections of the README
- `website/docs/development/` — HTML email, templates, and related lists


## README section → docs page map

When adding an entry, update **both** the README section and the matching docs file.
Headings are the README `##` / `###` titles; `… >` means a `###` under
"Resources which give answers about importance e-mail in your business".
The map was built by matching each README section's links against the docs pages
that already contain them, so it reflects where entries actually live today.

| README section | Docs file |
| --- | --- |
| Newsletter Platforms | `website/docs/tools/newsletter-platforms.md` |
| Self-Hosted ESPs | `website/docs/tools/self-hosted-esp.md` |
| Email Builders & Templates | `website/docs/tools/email-builders.md` |
| Deliverability & Testing Tools | `website/docs/tools/deliverability-tools.md` |
| Growth & Automation Tools | `website/docs/tools/growth-automation-tools.md` |
| Email Service Providers | `website/docs/tools/email-service-providers.md` |
| Email Marketing For eCommerce | `website/docs/tools/ecommerce.md` |
| Automation Email Marketing platform (all three subsections) | `website/docs/tools/automation-platforms.md` |
| Tools for effective work with emails | `website/docs/tools/email-work-tools.md` |
| Open source tools | `website/docs/tools/open-source-tools.md` |
| Similar companies | `website/docs/more/similar-companies.md` |
| Building an email list | `website/docs/strategy/building-an-email-list.md` |
| Data Driven Email Marketing | `website/docs/strategy/data-driven.md` |
| Lifecycle of (all subsections) | `website/docs/strategy/lifecycle-emails.md` |
| Personalization and slides | `website/docs/strategy/personalization.md` |
| Read and use later | `website/docs/guides/read-later.md` |
| Newsletters lead generation (all subsections) | `website/docs/strategy/lead-generation.md` |
| Blogs | `website/docs/guides/blogs.md` |
| Resources which give answers about importance e-mail in your business | `website/docs/guides/why-email-matters.md` |
| … > Demand Curve: Tested tactics for growing newsletters | `website/docs/guides/demand-curve.md` |
| … > Email templates | `website/docs/guides/email-templates.md` |
| … > Email marketing insights from Vero | `website/docs/industry-leaders/esp-blogs/vero.md` |
| … > Zapier Blog | `website/docs/industry-leaders/growth/zapier.md` |
| … > Drip blog | `website/docs/industry-leaders/ecommerce/drip.md` |
| … > Automizy Blog | `website/docs/industry-leaders/esp-blogs/automizy.md` |
| … > Revue: fears and risks | `website/docs/industry-leaders/publications/revue.md` |
| … > GDPR | `website/docs/operations/gdpr.md` |
| … > Frontend Development (tutorials) | `website/docs/development/html-email-tutorials.md` |
| … > Frontend Development (templates) | `website/docs/development/html-email-templates.md` |
| Github Repositories > HTML email templates & boilerplates | `website/docs/development/github-email-templates.md` |
| Github Repositories > Frameworks & compilers | `website/docs/development/github-frameworks.md` |
| Github Repositories > Infrastructure & APIs | `website/docs/development/github-infrastructure.md` |
| Github Repositories > Checkers | `website/docs/development/checkers.md` |
| Github Repositories > GitHub repositories related to email marketing | `website/docs/development/related-repositories.md` |
| Github Repositories > HTML stuff | `website/docs/development/html-utilities.md` |
| Github Repositories > Cool projects to take a look | `website/docs/development/cool-projects.md` |
| Miscellaneous | `website/docs/more/miscellaneous.md` |
| Tech Newsletters (all subsections) | `website/docs/more/tech-newsletters.md` |
| Arthur Tkachenko articles | `website/docs/more/arthur-tkachenko.md` |
| Administration > DNS DKIM Records | `website/docs/operations/dns-dkim.md` |
| Administration > Sending emails via Amazon SES | `website/docs/operations/amazon-ses.md` |
| Newsletter Metrics > Email Marketing Basics | `website/docs/operations/metrics/email-marketing-basics.md` |
| Newsletter Metrics > How To Measure Your Newsletter Performance | `website/docs/operations/metrics/measure-performance.md` |
| Newsletter Metrics > All about effective Email Marketing | `website/docs/operations/metrics/effective-email-marketing.md` |
| Email marketing strategy (incl. Email marketing for startups) | `website/docs/strategy/email-marketing-strategy.md` |
| Transactional Emails > Concepts & guides | `website/docs/more/transactional-articles.md` |
| Transactional Emails > Providers & products | `website/docs/more/transactional-tools.md` |
| Awesome lists | `website/docs/more/awesome-lists.md` |
| Additional content | `website/docs/more/additional-content.md` |

If the section is not listed, search `website/docs/` for the closest page or ask before inventing a new one.
The README ↔ Docs sync check passes a README-only PR when every added link is already on a docs page
(`pass-if-links-in-docs: true`), so updating the docs file in the same PR is what keeps it green.

## How to add an entry

1. Find the correct section in `README.md` and the matching docs file (table above).
2. Use this format in both places:

   ```markdown
   - [Name](https://example.com) — Short description. Optional disclosure.
   ```

3. Keep the description to one short sentence.
4. If the product is commercial and you are affiliated, say so in the description or PR body.
5. Open one PR that changes **both** files. Do not open a README-only PR.
6. In the PR body, link the live URL and mention the docs page you updated.
7. Always report the PR with its full URL, e.g. `https://github.com/LLazyEmail/awesome-email-marketing/pull/123`.

## Useful links

- Live site: https://llazyemail.github.io/awesome-email-marketing/
- Contributing: see root `README.md` and any `CONTRIBUTING` notes
- Org-wide agent conventions: see the LLazyEmail organization profile
