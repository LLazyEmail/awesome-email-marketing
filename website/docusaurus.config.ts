import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Awesome Email Marketing',
  tagline:
    'A curated collection of articles, templates, tools, and resources to build and manage emails.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://llazyemail.github.io',
  baseUrl: '/awesome-email-marketing/',

  organizationName: 'LLazyEmail',
  projectName: 'awesome-email-marketing',

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/LLazyEmail/awesome-email-marketing/tree/main/website/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/LLazyEmail/awesome-email-marketing/tree/main/website/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Awesome Email Marketing',
      logo: {
        alt: 'Awesome Email Marketing Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Resources',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/LLazyEmail/awesome-email-marketing',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Resources',
          items: [
            {
              label: 'Overview',
              to: '/docs/',
            },
            {
              label: 'Best Tools',
              to: '/docs/tools/best-tools',
            },
            {
              label: 'Building an Email List',
              to: '/docs/strategy/building-an-email-list',
            },
            {
              label: 'Opt-in Tactics',
              to: '/docs/strategy/opt-in-tactics',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LLazyEmail on LinkedIn',
              href: 'https://www.linkedin.com/company/llazyemail/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/LLazyEmail/awesome-email-marketing',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Services',
              to: '/docs/more/services',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} LLazyEmail. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
