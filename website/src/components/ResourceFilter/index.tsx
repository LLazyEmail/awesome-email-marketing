import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import clsx from 'clsx';
import catalog from '@site/src/data/catalog.json';
import type {CatalogPayload} from '@site/src/data/types';

import styles from './styles.module.css';

const data = catalog as CatalogPayload;

function useQueryState() {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const query = params.get('q') ?? '';
  const selectedTags = (params.get('tag') ?? '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  const setState = useCallback(
    (next: {q?: string; tags?: string[]}) => {
      const nextParams = new URLSearchParams();
      const nextQuery = next.q ?? query;
      const nextTags = next.tags ?? selectedTags;
      if (nextQuery) {
        nextParams.set('q', nextQuery);
      }
      if (nextTags.length > 0) {
        nextParams.set('tag', nextTags.join(','));
      }
      const search = nextParams.toString();
      const nextSearch = search ? `?${search}` : '';
      if (nextSearch === location.search) {
        return;
      }
      history.replace({
        pathname: location.pathname,
        search: nextSearch,
      });
    },
    [history, location.pathname, location.search, query, selectedTags],
  );

  return {query, selectedTags, setState};
}

export default function ResourceFilter(): ReactNode {
  const {query, selectedTags, setState} = useQueryState();
  const [draftQuery, setDraftQuery] = useState(query);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (draftQuery !== query) {
        setState({q: draftQuery});
      }
    }, 200);
    return () => window.clearTimeout(handle);
  }, [draftQuery, query, setState]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return data.items.filter((item) => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => item.tags.includes(tag));
      if (!matchesTags) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack =
        `${item.name} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, selectedTags]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setState({tags: selectedTags.filter((value) => value !== tag)});
      return;
    }
    setState({tags: [...selectedTags, tag]});
  };

  return (
    <div className={styles.layout}>
      <div className={styles.controls}>
        <label className="sr-only" htmlFor="resource-filter-search">
          Search resources
        </label>
        <input
          id="resource-filter-search"
          className={styles.searchInput}
          type="search"
          placeholder="Search tools, repos, checkers…"
          value={draftQuery}
          onChange={(event) => setDraftQuery(event.target.value)}
        />
        <div className={styles.tagRow} role="group" aria-label="Filter tags">
          {data.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={clsx(
                styles.tagButton,
                selectedTags.includes(tag) && styles.tagButtonActive,
              )}
              onClick={() => toggleTag(tag)}
              aria-pressed={selectedTags.includes(tag)}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.meta}>
        <span>
          Showing <strong>{filtered.length}</strong> of {data.items.length}{' '}
          resources
        </span>
        {(query || selectedTags.length > 0) && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setDraftQuery('');
              setState({q: '', tags: []});
            }}>
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No resources match those filters.</div>
      ) : (
        <div className={styles.results}>
          {filtered.map((item) => (
            <article key={`${item.id}-${item.url}`} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                </h3>
                <Link className={styles.sourceLink} to={item.sourcePage}>
                  View in docs
                </Link>
              </div>
              {item.description ? (
                <p className={styles.description}>{item.description}</p>
              ) : null}
              <div className={styles.cardTags}>
                {item.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={styles.chip}
                    onClick={() => toggleTag(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
