# Contributing

Thanks for helping grow the list! Most contributions add one tool or resource.

## Add an entry in two places

Every entry lives in **both**:

1. `README.md`, in the right section, and
2. the matching docs page under `website/docs/`, which is published on the site.

The [README section → docs page map in AGENTS.md](./AGENTS.md#readme-section--docs-page-map)
tells you which page goes with which section. Put the entry in the same position (alphabetical
or next to similar tools) and use the same one-line format:

```md
- [Name](https://example.com) - What it does, in one sentence. Free plan / open source / pricing note.
```

If you only change `README.md`, the **check-sync** check fails. A bot then adds the
`needs-docs-sync` label and comments with the exact docs file, section and line to add.
Push that change to the same PR, and the label goes away and the comment says resolved.

## Before you open the PR

- One tool per line, a working `https` link, no tracking parameters.
- Say so if you built the tool ("Built by the submitter").
- Stars are appreciated ⭐ (see the PR template).

## After you open it

- Checks run automatically: markdownlint, link check, entry format, README ↔ docs sync.
- If your PR conflicts with `main`, a maintainer workflow may open a new PR that
  `Supersedes #<yours>` with you credited as co-author. Nothing to do on your side.
