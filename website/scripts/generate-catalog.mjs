#!/usr/bin/env node
/**
 * Parse curated markdown lists into a tagged catalog + public API JSON.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(websiteRoot, 'docs');

const SOURCES = [
  {
    file: 'tools/newsletter-platforms.md',
    section: 'tools',
    page: '/docs/tools/newsletter-platforms',
    baseTags: ['newsletter', 'esp'],
  },
  {
    file: 'tools/self-hosted-esp.md',
    section: 'tools',
    page: '/docs/tools/self-hosted-esp',
    baseTags: ['self-hosted', 'esp', 'open-source'],
  },
  {
    file: 'tools/email-builders.md',
    section: 'tools',
    page: '/docs/tools/email-builders',
    baseTags: ['templates', 'builders'],
  },
  {
    file: 'tools/deliverability-tools.md',
    section: 'tools',
    page: '/docs/tools/deliverability-tools',
    baseTags: ['deliverability', 'checker'],
  },
  {
    file: 'tools/growth-automation-tools.md',
    section: 'tools',
    page: '/docs/tools/growth-automation-tools',
    baseTags: ['automation'],
  },
  {
    file: 'tools/email-service-providers.md',
    section: 'tools',
    page: '/docs/tools/email-service-providers',
    baseTags: ['esp', 'newsletter'],
  },
  {
    file: 'tools/ecommerce.md',
    section: 'tools',
    page: '/docs/tools/ecommerce',
    baseTags: ['ecommerce', 'esp'],
  },
  {
    file: 'tools/automation-platforms.md',
    section: 'tools',
    page: '/docs/tools/automation-platforms',
    baseTags: ['automation'],
  },
  {
    file: 'tools/email-work-tools.md',
    section: 'tools',
    page: '/docs/tools/email-work-tools',
    baseTags: ['utility', 'checker'],
  },
  {
    file: 'tools/open-source-tools.md',
    section: 'tools',
    page: '/docs/tools/open-source-tools',
    baseTags: ['open-source', 'esp'],
  },
  {
    file: 'development/checkers.md',
    section: 'development',
    page: '/docs/development/checkers',
    baseTags: ['checker', 'development'],
  },
  {
    file: 'development/github-email-templates.md',
    section: 'development',
    page: '/docs/development/github-email-templates',
    baseTags: ['templates', 'github', 'development'],
  },
  {
    file: 'development/github-frameworks.md',
    section: 'development',
    page: '/docs/development/github-frameworks',
    baseTags: ['github', 'development', 'open-source'],
  },
  {
    file: 'development/github-infrastructure.md',
    section: 'development',
    page: '/docs/development/github-infrastructure',
    baseTags: ['github', 'development'],
  },
  {
    file: 'development/cool-projects.md',
    section: 'development',
    page: '/docs/development/cool-projects',
    baseTags: ['github', 'development', 'open-source'],
  },
  {
    file: 'development/related-repositories.md',
    section: 'development',
    page: '/docs/development/related-repositories',
    baseTags: ['github', 'development'],
  },
];

const TAG_RULES = [
  {tag: 'open-source', pattern: /open[-\s]?source|self[-\s]?hosted|github\.com/i},
  {tag: 'self-hosted', pattern: /self[-\s]?hosted|self hosted/i},
  {tag: 'free', pattern: /\bfree\b|no signup|no cost/i},
  {tag: 'ses', pattern: /\bSES\b|Amazon SES|aws/i},
  {tag: 'cold-email', pattern: /cold email|outbound|deliverability infrastructure/i},
  {tag: 'transactional', pattern: /transactional/i},
  {tag: 'automation', pattern: /automation|automate|workflow|drip|lifecycle/i},
  {tag: 'ecommerce', pattern: /e-?commerce|shopify|woocommerce|klaviyo/i},
  {tag: 'newsletter', pattern: /newsletter|substack|revue|buttondown/i},
  {tag: 'deliverability', pattern: /deliverability|spam|dkim|spf|dmarc|warmup|warm-up/i},
  {tag: 'templates', pattern: /template/i},
  {tag: 'checker', pattern: /check|validator|grader|lint/i},
  {tag: 'cli', pattern: /\bCLI\b|command line|npm i -g/i},
];

const ITEM_RE =
  /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)(?:\s*[-–—:]\s*(.+))?$/;

function inferTags(name, description, url, baseTags) {
  const haystack = `${name} ${description || ''} ${url}`;
  const tags = new Set(baseTags);
  for (const rule of TAG_RULES) {
    if (rule.pattern.test(haystack)) {
      tags.add(rule.tag);
    }
  }
  if (url.includes('github.com')) {
    tags.add('github');
  }
  return [...tags].sort();
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFile(source) {
  const fullPath = path.join(docsRoot, source.file);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  const text = fs.readFileSync(fullPath, 'utf8');
  const items = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(ITEM_RE);
    if (!match) {
      continue;
    }
    const [, name, url, description = ''] = match;
    items.push({
      id: slugify(name),
      name: name.trim(),
      url: url.trim(),
      description: description.trim(),
      section: source.section,
      sourcePage: source.page,
      sourceFile: source.file,
      tags: inferTags(name, description, url, source.baseTags),
    });
  }
  return items;
}

function dedupe(items) {
  const byKey = new Map();
  for (const item of items) {
    const key = `${item.name.toLowerCase()}::${item.url.replace(/\/$/, '')}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, item);
      continue;
    }
    existing.tags = [...new Set([...existing.tags, ...item.tags])].sort();
    if (!existing.description && item.description) {
      existing.description = item.description;
    }
  }
  return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function countDocs() {
  let count = 0;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.mdx?$/.test(entry.name) && entry.name !== '_category_.json') {
        count += 1;
      }
    }
  };
  walk(docsRoot);
  return count;
}

const catalog = dedupe(SOURCES.flatMap(parseFile));
const allTags = [...new Set(catalog.flatMap((item) => item.tags))].sort();
const bySection = catalog.reduce((acc, item) => {
  acc[item.section] = (acc[item.section] || 0) + 1;
  return acc;
}, {});
const byTag = allTags.reduce((acc, tag) => {
  acc[tag] = catalog.filter((item) => item.tags.includes(tag)).length;
  return acc;
}, {});

const generatedAt = new Date().toISOString();
const metrics = {
  generatedAt,
  resources: catalog.length,
  tags: allTags.length,
  docsPages: countDocs(),
  sections: Object.keys(bySection).length,
  bySection,
  byTag,
};

const glossaryPath = path.join(websiteRoot, 'src/data/glossary.json');
const glossary = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

const payload = {
  version: '1.0.0',
  generatedAt,
  name: 'Awesome Email Marketing catalog',
  homepage: 'https://llazyemail.github.io/awesome-email-marketing/',
  repository: 'https://github.com/LLazyEmail/awesome-email-marketing',
  tags: allTags,
  items: catalog,
};

const outputs = [
  path.join(websiteRoot, 'src/data/catalog.json'),
  path.join(websiteRoot, 'static/api/v1/catalog.json'),
];

for (const out of outputs) {
  fs.mkdirSync(path.dirname(out), {recursive: true});
  fs.writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`);
}

fs.writeFileSync(
  path.join(websiteRoot, 'static/api/v1/metrics.json'),
  `${JSON.stringify(metrics, null, 2)}\n`,
);
fs.writeFileSync(
  path.join(websiteRoot, 'static/api/v1/glossary.json'),
  `${JSON.stringify({version: '1.0.0', generatedAt, items: glossary}, null, 2)}\n`,
);

console.log(
  `Generated catalog with ${catalog.length} resources, ${allTags.length} tags, ${countDocs()} docs pages.`,
);
