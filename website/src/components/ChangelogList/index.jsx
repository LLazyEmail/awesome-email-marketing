import React from 'react';
import changelog from '@site/src/data/changelog.json';

const repoUrl = 'https://github.com/LLazyEmail/awesome-email-marketing';

function LinkifiedText({text}) {
  const regex = /(https:\/\/github\.com\/[^\/]+\/[^\/]+\/pull\/\d+)|#(\d+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const idx = match.index;
    if (idx > lastIndex) parts.push(text.slice(lastIndex, idx));

    if (match[1]) {
      const url = match[1];
      const prMatch = url.match(/pull\/(\d+)$/);
      const label = prMatch ? `#${prMatch[1]}` : url;
      parts.push(
        <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
          {label}
        </a>,
      );
    } else if (match[2]) {
      const num = match[2];
      const url = `${repoUrl}/pull/${num}`;
      parts.push(
        <a key={idx} href={url} target="_blank" rel="noopener noreferrer">
          #{num}
        </a>,
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? <span key={i}>{p}</span> : React.cloneElement(p, {key: i}),
      )}
    </>
  );
}

function pullRequestUrl(entry) {
  if (typeof entry.href === 'string' && entry.href) {
    return entry.href;
  }

  for (const item of entry.items ?? []) {
    const urlMatch = String(item).match(
      /https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/pull\/\d+/,
    );
    if (urlMatch) {
      return urlMatch[0];
    }
  }

  for (const item of entry.items ?? []) {
    const numMatch = String(item).match(/#(\d+)/);
    if (numMatch) {
      return `${repoUrl}/pull/${numMatch[1]}`;
    }
  }

  return null;
}

export default function ChangelogList() {
  return (
    <div>
      {changelog.map((entry) => {
        const url = pullRequestUrl(entry);
        return (
          <section key={`${entry.date}-${entry.title}`} style={{marginBottom: '1.5rem'}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '1rem',
              }}>
              <h2 style={{margin: 0}}>
                {entry.date} —{' '}
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {entry.title}
                  </a>
                ) : (
                  entry.title
                )}
              </h2>
              <span style={{color: 'var(--ifm-color-muted)', fontSize: '0.9rem'}}>
                {entry.items.length} change{entry.items.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div
              style={{
                marginTop: '0.6rem',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                padding: '1rem',
                borderRadius: 8,
                background: 'var(--ifm-background-color)',
              }}>
              <ul style={{margin: 0, paddingLeft: '1.25rem'}}>
                {entry.items.map((item, idx) => (
                  <li key={idx} style={{marginBottom: '0.5rem'}}>
                    <LinkifiedText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
