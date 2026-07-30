import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageSearch from '@site/src/components/HomepageSearch';
import MetricsStrip from '@site/src/components/MetricsStrip';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title aem-big-title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <HomepageSearch />
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/explore">
            Explore & filter
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/docs/"
            style={{marginLeft: '0.75rem'}}>
            Browse docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <MetricsStrip />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
