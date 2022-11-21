// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const math = require('remark-math');
const katex = require('rehype-katex');
const wikiLinkPlugin = require('remark-wiki-link');
const walkSync = require('walk-sync');
const lightCodeTheme = require('prism-react-renderer/themes/github');

const meta = JSON.parse(require('fs').readFileSync('meta.json', { encoding: 'utf-8' }));

const wikilink = [
  wikiLinkPlugin,
  {
    pageResolver: (/** @type {string} */ wikilink) => {
      const paths = walkSync('docs', {
        globs: ["**/" + wikilink + ".md"],
        directories: false,
      }).map((path) => path.replace(".md", ""));
      if (paths.length) {
        return paths;
      } else {
        return ['404'];
      }
    },
    hrefTemplate: (/** @type {string} */ permalink) => `/${permalink}`,
    aliasDivider: '|'
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '谭淞宸的知识库',
  tagline: '沉淀知识，激发思想',
  url: 'https://notes.tansongchen.com',
  trailingSlash: true,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'favicon.ico',

  // GitHub pages deployment config.
  organizationName: 'tansongchen',
  projectName: 'notes',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/apple-icon-180.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(255, 136, 136)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/apple-icon-180.png',
          },
        ].concat(meta),
      },
    ],
  ],

  // themes: ['@docusaurus/theme-search-algolia'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [math, wikilink],
          rehypePlugins: [katex],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '谭淞宸的知识库',
        logo: {
          alt: '谭淞宸的知识库',
          src: 'favicon.ico',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'profession',
            position: 'left',
            label: '职业/工作'
          },
          {
            type: 'docSidebar',
            sidebarId: 'development',
            position: 'left',
            label: '成长/学习'
          },
          {
            type: 'docSidebar',
            sidebarId: 'creation',
            position: 'left',
            label: '创造/兴趣'
          },
          {
            href: 'https://tansongchen.com',
            label: '个人网站',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `CC-BY-SA 4.0 © 2022 - ${new Date().getFullYear()} 谭淞宸`,
      },
      prism: {
        theme: lightCodeTheme,
      },
      colorMode: {
        disableSwitch: true,
      },
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'YOUR_INDEX_NAME',
      // },
    }),

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

module.exports = config;
