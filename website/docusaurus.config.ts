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
  trailingSlash: false,

  organizationName: 'LLazyEmail',
  projectName: 'awesome-email-marketing',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // IBM Plex — same family as Hasura graphql-engine docs
  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap',
      type: 'text/css',
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          showLastUpdateTime: false,
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

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/docs',
        indexBlog: true,
        searchBarShortcutHint: true,
      },
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-copy-page-button',
      {
        placement: 'toc',
        mcpServer: {
          name: 'awesome-email-marketing',
          url: 'https://www.agentready.it.com/api/mcp',
        },
      },
    ],
    [
      'docusaurus-plugin-llms',
      {
        generateLLMsTxt: true,
        generateLLMsFullTxt: true,
        generateMarkdownFiles: true,
        docsDir: 'docs',
        title: 'Awesome Email Marketing',
        description:
          'Curated articles, templates, tools, and resources for building and managing email marketing.',
        includeBlog: false,
        excludeImports: true,
        removeDuplicateHeadings: true,
        includeUnmatchedLast: true,
        includeOrder: [
          'intro.md',
          'tools/*',
          'strategy/*',
          'guides/*',
          'development/*',
          'operations/*',
          'more/*',
          'glossary.mdx',
          'api.mdx',
          'changelog.mdx',
        ],
      },
    ],
    'docusaurus-markdown-source-plugin',
    [
      '@agentreadyweb/docusaurus-plugin',
      {
        // GitHub Pages project site; AgentReady indexes this path after each build.
        domain: 'llazyemail.github.io/awesome-email-marketing',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
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
        {
          to: '/explore',
          label: 'Explore',
          position: 'left',
          className: 'nav-link_getting-started',
        },
        {
          type: 'dropdown',
          label: 'Browse',
          position: 'left',
          items: [
            {
              type: 'doc',
              docId: 'tools/best-tools',
              label: 'Tools & Platforms',
            },
            {
              type: 'doc',
              docId: 'strategy/building-an-email-list',
              label: 'Strategy & Growth',
            },
            {
              type: 'doc',
              docId: 'guides/why-email-matters',
              label: 'Guides & Articles',
            },
            {
              type: 'doc',
              docId: 'development/frontend-development',
              label: 'Development',
            },
            {
              type: 'doc',
              docId: 'operations/dns-dkim',
              label: 'Operations & Metrics',
            },
            {
              type: 'doc',
              docId: 'more/transactional-emails',
              label: 'More',
            },
          ],
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'doc',
          docId: 'pages-index',
          label: 'All pages',
          position: 'right',
        },
        {
          type: 'doc',
          docId: 'changelog',
          label: 'Changelog',
          position: 'right',
        },
        {
          href: 'https://github.com/LLazyEmail/awesome-email-marketing',
          label: 'GitHub',
          position: 'right',
          className: 'header-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start here',
          items: [
            {
              label: 'Overview',
              to: '/docs/',
            },
            {
              label: 'Explore & filter',
              to: '/explore',
            },
            {
              label: 'Best Tools',
              to: '/docs/tools/best-tools',
            },
            {
              label: 'Glossary',
              to: '/docs/glossary',
            },
          ],
        },
        {
          title: 'Popular topics',
          items: [
            {
              label: 'Lifecycle Emails',
              to: '/docs/strategy/lifecycle-emails',
            },
            {
              label: 'Frontend Development',
              to: '/docs/development/frontend-development',
            },
            {
              label: 'Amazon SES',
              to: '/docs/operations/amazon-ses',
            },
            {
              label: 'Changelog',
              to: '/docs/changelog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LLazyEmail/awesome-email-marketing',
            },
            {
              label: 'LLazyEmail on LinkedIn',
              href: 'https://www.linkedin.com/company/llazyemail/',
            },
            {
              label: 'Public API',
              to: '/docs/api',
            },
            {
              label: 'Catalog JSON',
              href: 'https://llazyemail.github.io/awesome-email-marketing/api/v1/catalog.json',
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
