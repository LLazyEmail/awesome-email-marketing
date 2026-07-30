import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Curated sidebar for faster scanning:
 * - start with Overview
 * - keep top-level categories few
 * - nest dense sections (vendor blogs, metrics)
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Tools & Platforms',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Tools & Platforms',
        description:
          'Email service providers, automation platforms, eCommerce tools, and open-source options.',
      },
      items: [
        'tools/best-tools',
        'tools/ecommerce',
        'tools/automation-platforms',
        'tools/email-work-tools',
        'tools/open-source-tools',
      ],
    },
    {
      type: 'category',
      label: 'Strategy & Growth',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Strategy & Growth',
        description:
          'List building, lifecycle campaigns, personalization, and growth playbooks.',
      },
      items: [
        {
          type: 'category',
          label: 'Get started',
          collapsed: false,
          items: [
            'strategy/reasons-for-newsletters',
            'strategy/sending-frequency',
            'strategy/email-marketing-strategy',
          ],
        },
        {
          type: 'category',
          label: 'Grow your list',
          collapsed: false,
          items: [
            'strategy/building-an-email-list',
            'strategy/list-building-playbook',
            'strategy/opt-in-tactics',
            'strategy/lead-generation',
          ],
        },
        {
          type: 'category',
          label: 'Campaigns & lifecycle',
          collapsed: true,
          items: [
            'strategy/lifecycle-emails',
            'strategy/personalization',
            'strategy/data-driven',
            'strategy/cold-email-tips',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides & Articles',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Guides & Articles',
        description: 'Curated reading lists, templates, and vendor blog roundups.',
      },
      items: [
        'guides/why-email-matters',
        'guides/read-later',
        'guides/email-templates',
        'guides/demand-curve',
        'guides/blogs',
        'guides/faq',
        {
          type: 'category',
          label: 'Vendor blogs',
          collapsed: true,
          link: {
            type: 'generated-index',
            title: 'Vendor Blogs',
            description:
              'Articles from Vero, Zapier, Drip, Automizy, and Revue.',
          },
          items: [
            'guides/vendor-blogs/vero-insights',
            'guides/vendor-blogs/zapier',
            'guides/vendor-blogs/drip',
            'guides/vendor-blogs/automizy',
            'guides/vendor-blogs/revue',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Development',
        description: 'HTML email coding resources, repositories, and tooling.',
      },
      items: [
        'development/frontend-development',
        'development/github-repositories',
        'development/related-repositories',
        'development/cool-projects',
        'development/html-utilities',
        'development/checkers',
      ],
    },
    {
      type: 'category',
      label: 'Operations & Metrics',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'Operations & Metrics',
        description:
          'Deliverability, compliance, Amazon SES, and performance measurement.',
      },
      items: [
        'operations/gdpr',
        'operations/administration',
        'operations/dns-dkim',
        'operations/amazon-ses',
        {
          type: 'category',
          label: 'Metrics & measurement',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'operations/metrics/index',
          },
          items: [
            'operations/metrics/email-marketing-basics',
            'operations/metrics/measure-performance',
            'operations/metrics/effective-email-marketing',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'More',
      collapsed: true,
      link: {
        type: 'generated-index',
        title: 'More',
        description: 'Transactional email, services, related lists, and extras.',
      },
      items: [
        'more/transactional-emails',
        'more/services',
        'more/arthur-tkachenko',
        'more/awesome-lists',
        'more/similar-companies',
        'more/miscellaneous',
        'more/additional-content',
      ],
    },
  ],
};

export default sidebars;
