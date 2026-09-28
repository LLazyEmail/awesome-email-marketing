#!/usr/bin/env node
/**
 * Parse website/docs/industry-leaders/** into a public API JSON of sources + articles.
 *
 * Usage: node ./scripts/generate-industry-leaders.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(websiteRoot, 'docs');
const leadersRoot = path.join(docsRoot, 'industry-leaders');
const outputPath = path.join(websiteRoot, 'static/api/v1/industry-leaders.json');

const ITEM_RE = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)(?:\s*[-–—:]\s*(.+))?$/;
const SKIP_FILES = new Set(['_SOURCE_TEMPLATE.md', 'index.md']);

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) {
    return out;
  }
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    if (entry.name.startsWith('.') || entry.name === '_category_.json') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
      continue;
    }
    if (entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

function parseFrontmatter(text) {
  if (!text.startsWith('---')) {
    return {data: {}, body: text};
  }
  const end = text.indexOf('\n---', 3);
  if (end === -1) {
    return {data: {}, body: text};
  }
  const block = text.slice(4, end);
  const data = {};
  let currentKey = null;
  let currentObject = null;
  for (const raw of block.split('\n')) {
    const line = raw.replace(/\t/g, '  ');
    const nested = line.match(/^  ([A-Za-z0-9_]+):\s*(.*)$/);
    if (nested && currentObject) {
      let value = nested[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      data[`${currentObject}.${nested[1]}`] = value;
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) {
      continue;
    }
    currentKey = match[1];
    let value = match[2].trim();
    if (value === '') {
      currentObject = currentKey;
      continue;
    }
    currentObject = null;
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[currentKey] = value;
  }
  return {data, body: text.slice(end + 4)};
}

function isExternalArticle(url) {
  if (!url) {
    return false;
  }
  if (url.startsWith('#') || url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return false;
  }
  if (url.startsWith('mailto:')) {
    return false;
  }
  return /^https?:\/\//i.test(url);
}

function collect() {
  const files = walk(leadersRoot);
  const sources = [];
  const articles = [];

  for (const file of files) {
    const relPath = path.relative(docsRoot, file).replace(/\\/g, '/');
    const text = fs.readFileSync(file, 'utf8');
    const {data, body} = parseFrontmatter(text);
    if (data.draft === 'true' || data.unlisted === 'true') {
      continue;
    }

    const slug = relPath.replace(/\.md$/i, '');
    const parts = slug.split('/');
    const topic = parts[1] || 'uncategorized';
    const sourceSlug = parts.slice(2).join('/') || parts[parts.length - 1];
    const sourceName = data['source.name'] || data.sidebar_label || data.title || sourceSlug;
    const homepage = data['source.homepage'] || '';
    const sourcePage = data.slug
      ? `/docs${data.slug.startsWith('/') ? data.slug : `/${data.slug}`}`
      : `/docs/${slug}`;

    const sourceArticles = [];
    let heading = 'Articles';
    for (const line of body.split(/\r?\n/)) {
      const h2 = line.match(/^##\s+(.+)$/);
      if (h2) {
        heading = h2[1].trim();
        continue;
      }
      const match = line.match(ITEM_RE);
      if (!match) {
        continue;
      }
      const [, title, url] = match;
      const href = url.trim();
      if (!isExternalArticle(href)) {
        continue;
      }
      if (homepage && href.replace(/\/$/, '') === homepage.replace(/\/$/, '')) {
        continue;
      }
      sourceArticles.push({
        title: title.trim(),
        url: href,
        heading,
        source: sourceSlug,
        topic,
        sourcePage,
      });
    }

    sources.push({
      id: sourceSlug,
      name: sourceName,
      topic,
      homepage: homepage || null,
      sourcePage,
      path: relPath,
      articleCount: sourceArticles.length,
    });
    articles.push(...sourceArticles);
  }

  sources.sort((a, b) => a.name.localeCompare(b.name));
  articles.sort((a, b) => a.title.localeCompare(b.title) || a.url.localeCompare(b.url));

  const byTopic = sources.reduce((acc, source) => {
    acc[source.topic] = (acc[source.topic] || 0) + source.articleCount;
    return acc;
  }, {});

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    name: 'Industry Leaders articles',
    homepage: 'https://llazyemail.github.io/awesome-email-marketing/docs/industry-leaders',
    repository: 'https://github.com/LLazyEmail/awesome-email-marketing',
    sourceCount: sources.length,
    articleCount: articles.length,
    byTopic,
    sources,
    articles,
  };
}

const payload = collect();
fs.mkdirSync(path.dirname(outputPath), {recursive: true});
fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  `Wrote ${payload.articleCount} articles from ${payload.sourceCount} sources to ${path.relative(websiteRoot, outputPath)}`,
);
