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

## Awesome-list merge / rebase workflow

When asked to merge as many open PRs as possible (or to rebase dirty ones):

1. List open PRs sorted by created ascending. Prefer older ones first.
2. Check `mergeable_state`. Prefer `clean` PRs that only touch README + the matching `website/docs/**/*.md` page.
3. For clean PRs that already update both README and the corresponding docs page → merge them directly (squash is fine).
4. For dirty PRs (conflicts) or README-only PRs that lack the docs counterpart:
   - Create a **new branch** from current `main` (do not force-push to the original author’s fork branch).
   - Apply the intended entry to both `README.md` and the matching docs page.
   - Open a **new PR** that supersedes the old one. Link the original PR number in the body and note that it can be closed after merge.
5. After a batch of merges, re-check remaining open PRs because `mergeable_state` often becomes `unknown` or `dirty` once the base moves.
6. Always report with full links, not bare numbers.
7. Do not merge or close unless the owner explicitly asks.

Typical docs path mapping:
- Deliverability & Testing Tools → `website/docs/tools/deliverability-tools.md`
- Growth & Automation Tools → `website/docs/tools/growth-automation-tools.md`
- HTML email templates → `website/docs/development/html-email-templates.md`
- Cool projects → `website/docs/development/cool-projects.md`
- Self-Hosted ESPs → `website/docs/tools/self-hosted-esps.md`
- Email work tools → `website/docs/tools/email-work-tools.md`
- Ecommerce → `website/docs/tools/ecommerce.md`

## Layout

- `README.md` — the canonical awesome list
- `website/` — Docusaurus site (docs under `website/docs/`)
- `website/docs/tools/` — tool category pages that mirror sections of the README
- `website/docs/development/` — HTML email, templates, and related lists

## Useful links

- Live site: https://llazyemail.github.io/awesome-email-marketing/
- Contributing: see root `README.md` and any `CONTRIBUTING` notes
- Org-wide agent conventions: see the LLazyEmail organization profile
