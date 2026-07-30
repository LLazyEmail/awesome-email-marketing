import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ResourceFilter from '@site/src/components/ResourceFilter';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function ExplorePage(): ReactNode {
  const catalogUrl = useBaseUrl('/api/v1/catalog.json');

  return (
    <Layout
      title="Explore"
      description="Filter Awesome Email Marketing tools, repositories, and utilities by tag.">
      <main className="container margin-vert--lg">
        <Heading as="h1">Explore resources</Heading>
        <p>
          Filter the curated catalog by tag or search. Prefer a reading list? Browse the{' '}
          <Link to="/docs/">docs</Link> or grab the{' '}
          <a href={catalogUrl}>JSON API</a>.
        </p>
        <ResourceFilter />
      </main>
    </Layout>
  );
}
