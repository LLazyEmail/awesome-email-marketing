# Awesome Email Marketing website

Docusaurus site for the Awesome Email Marketing list.

## Local development

```bash
cd website
npm install
npm start
```

Open [http://localhost:3000/awesome-email-marketing/](http://localhost:3000/awesome-email-marketing/).

Useful commands:

- `npm start` — local development server
- `npm run build` — production build
- `npm run serve` — serve the production build locally

## Search

Local search is enabled with [`@easyops-cn/docusaurus-search-local`](https://github.com/easyops-cn/docusaurus-search-local). Use the search box in the navbar or press `Ctrl/⌘ + K`.

## Automatic deployment

GitHub Actions workflows live in [`.github/workflows/`](../.github/workflows):

- `test-deploy.yml` — builds the site on pull requests
- `deploy.yml` — builds and deploys to GitHub Pages on pushes to `main`

### One-time GitHub Pages setup

1. Open the repository **Settings → Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Merge a PR (or run **Deploy to GitHub Pages** manually)

The site will be available at:

`https://llazyemail.github.io/awesome-email-marketing/`

## Content layout

```text
docs/
  intro.md                 Overview / start here
  tools/                   ESPs and platforms
  strategy/                Growth and campaign strategy
  guides/                  Reading lists + vendor-blogs/
  development/             HTML email and GitHub projects
  operations/              GDPR, DNS/DKIM, SES, metrics/
  more/                    Transactional, services, extras
```
