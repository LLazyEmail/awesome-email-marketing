---
title: "Industry Leaders"
description: "Curated articles from marketing-tech publishers, ESP blogs, deliverability labs, and industry analysts — one page per source."
keywords:
  - industry leaders
  - martech articles
  - email marketing blogs
  - marketing technology publications
  - awesome email marketing
sidebar_label: "Overview"
sidebar_position: 1
slug: /industry-leaders
image: img/docusaurus-social-card.jpg
category: industry-leaders
topics:
  - articles
audience:
  - marketers
seo:
  title: "Industry Leaders | Awesome Email Marketing"
  description: "Index of marketing-tech publications and vendor blogs. Each source is its own page with 10–20 curated article links."
  robots: index,follow
  canonical_path: "/docs/industry-leaders"
  og_type: website
  twitter_card: summary_large_image
---

# Industry Leaders

This section is a **one-page-per-source** catalog of marketing-tech websites. Each page lists about 10–20 articles from that publication so search engines get a unique, crawlable URL for every source.

## URL structure

Every source lives under a topic folder. The public path is always:

```text
/docs/industry-leaders/{topic}/{source-slug}
```

| Topic folder | What belongs here | Example URL |
| --- | --- | --- |
| `publications` | Independent magazines and research sites | `/docs/industry-leaders/publications/litmus` |
| `esp-blogs` | Official blogs of ESPs and newsletter platforms | `/docs/industry-leaders/esp-blogs/mailchimp` |
| `deliverability` | Inbox placement, authentication, anti-spam labs | `/docs/industry-leaders/deliverability/validity` |
| `growth` | Growth, lifecycle, and product-led content | `/docs/industry-leaders/growth/hubspot` |
| `ecommerce` | Commerce and retention publishers | `/docs/industry-leaders/ecommerce/klaviyo` |
| `developers` | HTML-email engineering and infrastructure | `/docs/industry-leaders/developers/really-good-emails` |

Adding a **new topic** is one folder + `_category_.json`. Adding a **new source** is one markdown file. Docusaurus autogenerates the sidebar from the filesystem, so you never edit `sidebars.ts` for this section.

## How to add a source

1. Pick the closest topic folder (or create one).
2. Copy [`_SOURCE_TEMPLATE.md`](./_SOURCE_TEMPLATE.md) to `{topic}/{source-slug}.md`.
3. Fill title, description, keywords, homepage, and 10–20 article links.
4. Keep slugs lowercase, hyphenated, matching the brand (`getvero` → `vero`).

See also the existing [Vendor blogs](/docs/guides/vendor-blogs/vero-insights) pages — those stay as legacy guides. New sources belong here.

## Topics

- [Publications](/docs/industry-leaders/publications)
- [ESP blogs](/docs/industry-leaders/esp-blogs)
- [Deliverability](/docs/industry-leaders/deliverability)
- [Growth](/docs/industry-leaders/growth)
- [Ecommerce](/docs/industry-leaders/ecommerce)
- [Developers](/docs/industry-leaders/developers)
