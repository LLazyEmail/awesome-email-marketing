import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  to: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tools & Platforms',
    to: '/docs/tools/best-tools',
    description: (
      <>
        Compare ESPs, automation platforms, eCommerce tools, and open-source
        newsletter software.
      </>
    ),
  },
  {
    title: 'Strategy & Growth',
    to: '/docs/strategy/building-an-email-list',
    description: (
      <>
        List-building playbooks, lifecycle campaigns, personalization, and
        opt-in tactics that convert.
      </>
    ),
  },
  {
    title: 'Build & Operate',
    to: '/docs/development/frontend-development',
    description: (
      <>
        HTML email tutorials, template collections, GitHub projects, and
        deliverability basics.
      </>
    ),
  },
];

function Feature({title, to, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Link to={to}>{title}</Link>
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
