import {useCallback, useEffect, useMemo, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useHistory, useLocation} from '@docusaurus/router';
import clsx from 'clsx';
import {
  BEST_TOOLS,
  CATEGORIES,
  type ToolCategory,
} from '@site/src/data/best-tools';

import styles from './styles.module.css';

function useDirectoryState() {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const query = params.get('q') ?? '';
  const categoryParam = params.get('category') ?? '';
  const category = CATEGORIES.some((item) => item.id === categoryParam)
    ? (categoryParam as ToolCategory)
    : '';

  const setState = useCallback(
    (next: {q?: string; category?: string}) => {
      const nextParams = new URLSearchParams();
      const nextQuery = next.q ?? query;
      const nextCategory = next.category ?? category;
      if (nextQuery) {
        nextParams.set('q', nextQuery);
      }
      if (nextCategory) {
        nextParams.set('category', nextCategory);
      }
      const search = nextParams.toString();
      const nextSearch = search ? `?${search}` : '';
      if (nextSearch === location.search) {
        return;
      }
      history.replace({
        pathname: location.pathname,
        search: nextSearch,
        hash: location.hash,
      });
    },
    [history, location.hash, location.pathname, location.search, query, category],
  );

  return {query, category, setState};
}

function ToolCard({tool}: {tool: (typeof BEST_TOOLS)[number]}): ReactNode {
  const category = CATEGORIES.find((item) => item.id === tool.category);
  return (
    <article className={clsx(styles.card, tool.featured && styles.cardFeatured)}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          <a href={tool.url} target="_blank" rel="noreferrer">
            {tool.name}
          </a>
        </h3>
        {tool.featured ? (
          <span className={styles.featuredBadge}>Starting point</span>
        ) : null}
      </div>
      {tool.description ? (
        <p className={styles.description}>{tool.description}</p>
      ) : null}
      <div className={styles.cardMeta}>
        {category ? (
          <span className={styles.categoryChip}>{category.label}</span>
        ) : null}
        {tool.sourcePage ? (
          <Link className={styles.sourceLink} to={tool.sourcePage}>
            View in docs
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export default function BestToolsDirectory(): ReactNode {
  const {query, category, setState} = useDirectoryState();
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
    return BEST_TOOLS.filter((tool) => {
      if (category && tool.category !== category) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack =
        `${tool.name} ${tool.description} ${tool.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, category]);

  const grouped = useMemo(() => {
    return CATEGORIES.map((item) => ({
      ...item,
      tools: filtered
        .filter((tool) => tool.category === item.id)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name)),
    })).filter((item) => item.tools.length > 0);
  }, [filtered]);

  const showGroups = !category;
  const filtersActive = Boolean(query || category);

  return (
    <div className={styles.layout}>
      <div className={styles.controls}>
        <label className="sr-only" htmlFor="best-tools-search">
          Search tools
        </label>
        <input
          id="best-tools-search"
          className={styles.searchInput}
          type="search"
          placeholder="Search by name or description…"
          value={draftQuery}
          onChange={(event) => setDraftQuery(event.target.value)}
        />
        <div className={styles.tagRow} role="group" aria-label="Filter by category">
          <button
            type="button"
            className={clsx(styles.tagButton, !category && styles.tagButtonActive)}
            onClick={() => setState({category: ''})}
            aria-pressed={!category}>
            All
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx(
                styles.tagButton,
                category === item.id && styles.tagButtonActive,
              )}
              onClick={() =>
                setState({category: category === item.id ? '' : item.id})
              }
              aria-pressed={category === item.id}>
              {item.label}
            </button>
          ))}
        </div>
        {showGroups && !query ? (
          <nav className={styles.jumpNav} aria-label="Jump to category">
            {grouped.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>

      <div className={styles.meta}>
        <span>
          Showing <strong>{filtered.length}</strong> of {BEST_TOOLS.length}{' '}
          tools
        </span>
        {filtersActive ? (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => {
              setDraftQuery('');
              setState({q: '', category: ''});
            }}>
            Clear filters
          </button>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>No tools match those filters.</div>
      ) : showGroups ? (
        grouped.map((item) => (
          <section
            key={item.id}
            id={item.id}
            className={styles.section}
            aria-labelledby={`${item.id}-title`}>
            <div className={styles.sectionHeader}>
              <h3 id={`${item.id}-title`} className={styles.sectionTitle}>
                {item.label}
              </h3>
              <Link className={styles.sectionLink} to={item.docsPage}>
                Full list
              </Link>
            </div>
            <div className={styles.grid}>
              {item.tools.map((tool) => (
                <ToolCard key={`${item.id}-${tool.name}`} tool={tool} />
              ))}
            </div>
          </section>
        ))
      ) : (
        <div className={styles.grid}>
          {filtered
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
        </div>
      )}
    </div>
  );
}
