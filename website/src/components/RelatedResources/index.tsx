import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {getRelatedLinks} from '@site/src/data/related';

import styles from './styles.module.css';

type Props = {
  docId: string;
};

export default function RelatedResources({docId}: Props): ReactNode {
  const links = getRelatedLinks(docId);
  if (links.length === 0) {
    return null;
  }

  return (
    <aside className={styles.block} aria-label="Related resources">
      <h2 className={styles.title}>Related resources</h2>
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
