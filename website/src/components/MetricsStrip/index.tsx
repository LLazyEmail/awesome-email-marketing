import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import catalog from '@site/src/data/catalog.json';
import glossary from '@site/src/data/glossary.json';
import type {CatalogPayload} from '@site/src/data/types';

import styles from './styles.module.css';

const data = catalog as CatalogPayload;

const metrics = [
  {
    value: data.items.length,
    label: 'Curated resources',
    to: '/explore',
  },
  {
    value: data.tags.length,
    label: 'Filter tags',
    to: '/explore',
  },
  {
    value: glossary.length,
    label: 'Glossary terms',
    to: '/docs/glossary',
  },
  {
    value: new Set(data.items.map((item) => item.section)).size,
    label: 'Top sections',
    to: '/docs/',
  },
];

export default function MetricsStrip(): ReactNode {
  return (
    <section className={styles.strip} aria-label="Library metrics">
      <div className="container">
        <div className={styles.grid}>
          {metrics.map((metric) => (
            <Link key={metric.label} className={styles.metric} to={metric.to}>
              <span className={styles.value}>{metric.value}</span>
              <span className={styles.label}>{metric.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
