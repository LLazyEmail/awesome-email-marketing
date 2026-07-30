import {useState, type FormEvent, type ReactNode} from 'react';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

const SUGGESTIONS = [
  {label: 'Mailchimp', q: 'mailchimp'},
  {label: 'DKIM', q: 'dkim'},
  {label: 'Templates', q: 'templates'},
  {label: 'Self-hosted', q: 'self-hosted'},
  {label: 'Automation', q: 'automation'},
];

export default function HomepageSearch(): ReactNode {
  const history = useHistory();
  const explorePath = useBaseUrl('/explore');
  const [query, setQuery] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams();
    if (trimmed) {
      params.set('q', trimmed);
    }
    const search = params.toString();
    history.push(`${explorePath}${search ? `?${search}` : ''}`);
  };

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={onSubmit} role="search">
        <label className={styles.srOnly} htmlFor="homepage-search">
          Search the email marketing library
        </label>
        <div className={styles.field}>
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path
                d="M20 20l-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            id="homepage-search"
            className={styles.input}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools, templates, deliverability…"
            autoComplete="off"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </div>
      </form>
      <div className={styles.suggestions}>
        <span className={styles.suggestionLabel}>Try</span>
        {SUGGESTIONS.map((item) => (
          <button
            key={item.q}
            type="button"
            className={styles.chip}
            onClick={() => history.push(`${explorePath}?q=${encodeURIComponent(item.q)}`)}>
            {item.label}
          </button>
        ))}
        <span className={styles.hint}>or press Ctrl/⌘ + K in docs</span>
      </div>
    </div>
  );
}
