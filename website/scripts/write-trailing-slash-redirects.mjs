#!/usr/bin/env node
/**
 * GitHub Pages 404s on trailing-slash URLs when `trailingSlash` is false.
 *
 * Docusaurus writes `docs/guides/growth-hacks.html` for
 * `/docs/guides/growth-hacks`. The same path is also a folder of child
 * pages (`docs/guides/growth-hacks/email-only-form.html`), so a request
 * for `/docs/guides/growth-hacks/` looks for `index.html` in that folder
 * and 404s. The same happens for `/docs/`, `/search/`, and any other
 * page that has a sibling directory.
 *
 * After the Docusaurus build, write a small redirect `index.html` next
 * to every `*.html` page (unless one already exists) so the trailing
 * slash URL serves a 200 and sends the visitor to the canonical path,
 * keeping the query string and hash.
 *
 * Usage: node ./scripts/write-trailing-slash-redirects.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const buildDir = path.join(websiteRoot, 'build');
const baseUrl = (
  process.env.SITE_BASE_PATH || '/awesome-email-marketing'
).replace(/\/$/, '');

const SKIP_FILES = new Set(['404.html']);

function walkHtmlFiles(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(full, out);
      continue;
    }
    if (entry.name.endsWith('.html') && !SKIP_FILES.has(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function renderRedirect(target) {
  const safeTarget = target.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0;url=${safeTarget}" />
    <link rel="canonical" href="${safeTarget}" />
    <title>Redirecting…</title>
    <script>
      (function () {
        var target = ${JSON.stringify(target)};
        var search = window.location.search || '';
        var hash = window.location.hash || '';
        window.location.replace(target + search + hash);
      })();
    </script>
  </head>
  <body>
    <p>Redirecting to <a href="${safeTarget}">${safeTarget}</a>…</p>
  </body>
</html>
`;
}

function main() {
  if (!fs.existsSync(buildDir)) {
    console.error(`Missing ${buildDir}. Run npm run build first.`);
    process.exit(1);
  }

  const files = walkHtmlFiles(buildDir);
  let written = 0;
  let skipped = 0;

  for (const htmlFile of files) {
    const basename = path.basename(htmlFile);
    if (basename === 'index.html') {
      continue;
    }

    const destDir = htmlFile.slice(0, -'.html'.length);
    const indexFile = path.join(destDir, 'index.html');
    if (fs.existsSync(indexFile)) {
      skipped += 1;
      continue;
    }

    const rel = path.relative(buildDir, htmlFile).replace(/\\/g, '/');
    const urlPath = `/${rel.replace(/\.html$/, '')}`;
    const target = `${baseUrl}${urlPath}`;

    fs.mkdirSync(destDir, {recursive: true});
    fs.writeFileSync(indexFile, renderRedirect(target), 'utf8');
    written += 1;
  }

  console.log(
    `Wrote ${written} trailing-slash redirect(s) under build/ (${skipped} existing index.html left unchanged).`,
  );
}

main();
