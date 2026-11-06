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

## Layout

- `README.md` — the canonical awesome list
- `website/` — Docusaurus site (docs under `website/docs/`)
- `website/docs/tools/` — tool category pages that mirror sections of the README
- `website/docs/development/` — HTML email, templates, and related lists

## Useful links

- Live site: https://llazyemail.github.io/awesome-email-marketing/
- Contributing: see root `README.md` and any `CONTRIBUTING` notes
- Org-wide agent conventions: see the LLazyEmail organization profile
