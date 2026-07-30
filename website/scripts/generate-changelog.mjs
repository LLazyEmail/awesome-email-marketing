#!/usr/bin/env node
/**
 * Generate CHANGELOG.md and website/src/data/changelog.json from git history
 * using the auto-changelog npm package (merged PRs).
 */
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const websiteDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(websiteDir, '..');
const changelogMdPath = path.join(repoRoot, 'CHANGELOG.md');
const changelogJsonPath = path.join(websiteDir, 'src/data/changelog.json');
const configPath = path.join(websiteDir, '.auto-changelog');

const autoChangelogBin = path.join(
  websiteDir,
  'node_modules',
  '.bin',
  'auto-changelog',
);

function loadConfig() {
  const defaults = {
    startingDate: '2026-07-29',
    ignoreCommitPattern: '^chore\\(changelog\\)|^\\[changelog\\]',
  };
  try {
    return {...defaults, ...JSON.parse(fs.readFileSync(configPath, 'utf8'))};
  } catch {
    return defaults;
  }
}

function runAutoChangelogJson(config) {
  const args = [
    '--stdout',
    '--template',
    'json',
    '--unreleased',
    '--commit-limit',
    'false',
    '--hide-credit',
    '--sort-commits',
    'date-desc',
  ];

  if (config.ignoreCommitPattern) {
    args.push('--ignore-commit-pattern', config.ignoreCommitPattern);
  }

  return execFileSync(autoChangelogBin, args, {
    cwd: websiteDir,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
}

function toIsoDate(value) {
  if (!value) {
    return new Date().toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

function collectMerges(releases, startingDate) {
  const merges = [];
  for (const release of releases) {
    for (const merge of release.merges ?? []) {
      const date = toIsoDate(merge.commit?.date ?? release.isoDate);
      if (startingDate && date < startingDate) {
        continue;
      }
      merges.push({
        id: merge.id,
        message: (merge.message || merge.commit?.subject || 'Merged pull request').trim(),
        href: merge.href,
        date,
        author: merge.author,
      });
    }
  }
  return merges;
}

function buildSiteChangelog(merges) {
  return merges.map((merge) => {
    const prRef = merge.id ? `#${merge.id}` : null;
    const items = [
      prRef ? `Merged pull request ${prRef}` : 'Merged pull request',
    ];
    if (merge.href) {
      items.push(merge.href);
    }
    return {
      date: merge.date,
      title: merge.message,
      items,
    };
  });
}

function buildMarkdown(merges) {
  const lines = [
    '# Changelog',
    '',
    'All notable changes to this project are documented in this file.',
    '',
    'This changelog is generated automatically from merged pull requests with [`auto-changelog`](https://github.com/CookPete/auto-changelog).',
    '',
    '## Unreleased',
    '',
    '### Merged',
    '',
  ];

  for (const merge of merges) {
    const link = merge.href && merge.id ? ` ([#${merge.id}](${merge.href}))` : '';
    lines.push(`- ${merge.message}${link}`);
  }

  if (merges.length === 0) {
    lines.push('- _No merged pull requests in range yet._');
  }

  lines.push('');
  return `${lines.join('\n')}\n`;
}

const config = loadConfig();
console.log('Fetching merged PR history with auto-changelog…');
const releases = JSON.parse(runAutoChangelogJson(config));
const merges = collectMerges(releases, config.startingDate);

console.log(`Writing ${changelogMdPath} (${merges.length} merges since ${config.startingDate})…`);
fs.writeFileSync(changelogMdPath, buildMarkdown(merges), 'utf8');

const siteEntries = buildSiteChangelog(merges);
console.log(`Writing ${changelogJsonPath}…`);
fs.writeFileSync(
  changelogJsonPath,
  `${JSON.stringify(siteEntries, null, 2)}\n`,
  'utf8',
);

console.log(`Done. ${siteEntries.length} changelog entries.`);
