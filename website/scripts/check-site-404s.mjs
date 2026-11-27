#!/usr/bin/env node
/**
 * Check published site paths for HTTP 404s.
 *
 * Reads website/static/api/v1/docs-pages.json plus a small set of
 * known routes and short aliases. Hits the live GitHub Pages site
 * (or SITE_BASE_URL) and fails if any path returns 404.
 *
 * Usage:
 *   node ./scripts/check-site-404s.mjs
 *   SITE_BASE_URL=https://llazyemail.github.io/awesome-email-marketing node ./scripts/check-site-404s.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(__dirname, '..');
const pagesFile = path.join(siteRoot, 'static/api/v1/docs-pages.json');

const BASE =
  process.env.SITE_BASE_URL?.replace(/\/$/, '') ||
  'https://llazyemail.github.io/awesome-email-marketing';

/** Short paths people hit that should resolve (redirect or real page). */
const EXTRA_PATHS = [
  '/',
  '/docs',
  '/docs/',
  '/explore',
  '/explore?tag=templates',
  '/search/?q=esp',
  '/github-frameworks',
  '/docs/development/github-frameworks',
];

function loadDocPaths() {
  if (!fs.existsSync(pagesFile)) {
    console.error(`Missing ${pagesFile}. Run npm run generate:docs-index first.`);
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(pagesFile, 'utf8'));
  return (data.pages ?? [])
    .filter((page) => !page.draft && !page.unlisted && page.url)
    .map((page) => page.url);
}

async function checkOne(pathname) {
  const url = `${BASE}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {'user-agent': 'awesome-email-marketing-404-check'},
    });
    const text = await response.text();
    const isNotFoundPage =
      /Page Not Found|We could not find what you were looking for|Site not found/i.test(
        text,
      );
    const ok = response.status >= 200 && response.status < 400 && !isNotFoundPage;
    return {url, status: response.status, ok, notFoundPage: isNotFoundPage};
  } catch (error) {
    return {url, status: 0, ok: false, error: error.message};
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const paths = [...new Set([...loadDocPaths(), ...EXTRA_PATHS])];
  console.log(`Checking ${paths.length} paths on ${BASE}`);

  const failures = [];
  const concurrency = 8;
  let index = 0;

  async function worker() {
    while (index < paths.length) {
      const pathname = paths[index++];
      const result = await checkOne(pathname);
      if (!result.ok) {
        failures.push(result);
        console.error(
          `  FAIL ${result.status || 'ERR'} ${result.url}${result.error ? ` (${result.error})` : ''}`,
        );
      }
    }
  }

  await Promise.all(Array.from({length: concurrency}, () => worker()));

  if (failures.length) {
    console.error(`\n${failures.length} path(s) failed.`);
    process.exit(1);
  }
  console.log(`All ${paths.length} paths responded OK.`);
}

main();
