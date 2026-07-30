#!/usr/bin/env node
/**
 * Fail when a docs page has more than MAX_LINKS markdown links
 * without at least MIN_H2 section headings (## ).
 *
 * Usage: node ./scripts/check-docs-link-count.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsRoot = path.resolve(__dirname, '../docs');

const MAX_LINKS = 20;
const MIN_H2 = 2;

const LINK_RE = /\[[^\]]+\]\([^)]+\)/g;
const H2_RE = /^##\s+\S+/gm;

function walkMarkdown(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMarkdown(full, out);
      continue;
    }
    if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      out.push(full);
    }
  }
  return out;
}

function stripFrontmatter(text) {
  if (!text.startsWith('---')) {
    return text;
  }
  const end = text.indexOf('\n---', 3);
  if (end === -1) {
    return text;
  }
  return text.slice(end + 4);
}

const failures = [];
const warnings = [];

for (const file of walkMarkdown(docsRoot)) {
  const body = stripFrontmatter(fs.readFileSync(file, 'utf8'));
  const links = body.match(LINK_RE) ?? [];
  const h2s = body.match(H2_RE) ?? [];
  const rel = path.relative(path.resolve(__dirname, '..'), file);

  // Auto-generated full indexes are intentionally dense.
  if (rel.endsWith(`${path.sep}pages-index.md`) || rel === 'docs/pages-index.md') {
    continue;
  }

  if (links.length > MAX_LINKS && h2s.length < MIN_H2) {
    failures.push(
      `${rel}: ${links.length} links, ${h2s.length} H2 section(s) (need ≥${MIN_H2} when links > ${MAX_LINKS})`,
    );
  } else if (links.length > MAX_LINKS) {
    warnings.push(
      `${rel}: ${links.length} links (sectioned with ${h2s.length} H2s — OK)`,
    );
  }
}

if (warnings.length) {
  console.log('Docs link-count check — dense but sectioned pages:');
  for (const line of warnings) {
    console.log(`  · ${line}`);
  }
}

if (failures.length) {
  console.error('\nDocs link-count check FAILED:');
  for (const line of failures) {
    console.error(`  ✗ ${line}`);
  }
  console.error(
    `\nAdd ## headings or split the page. Threshold: >${MAX_LINKS} links requires ≥${MIN_H2} H2 sections.`,
  );
  process.exit(1);
}

console.log(
  `Docs link-count check passed (${walkMarkdown(docsRoot).length} pages; max unsectioned links ${MAX_LINKS}).`,
);
