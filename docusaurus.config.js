// @ts-check

const math = require('remark-math');
const katex = require('rehype-katex');
const wikiLinkPlugin = require('remark-wiki-link');
const walkSync = require('walk-sync');
const { basename, join } = require('path');
const { readdirSync, cpSync, writeFileSync, readFileSync } = require('fs');

const preprocess = (/** @type {string} */ basename, /** @type {string} */ content) => {
  content = content.trimStart();
  if (content.match(/\-\-\-\n(.|\n)*\n\-\-\-/g) !== null) {
    content = content.replace(/\-\-\-(\n(.|\n)*\n)\-\-\-/g, `---$1slug: '/${basename}'\n---`);
  } else {
    content = `---\nslug: '/${basename}'\n---\n` + content;
  }
  content = content.replace(/^(#+)/gm, '#$1');
  return content;
}

const downloader = (/** @type {string} */ root) => {
  const submodule = 'obsidian';
  for (const fileOrFolder of readdirSync(submodule)) {
    if (!fileOrFolder.startsWith('.')) {
      cpSync(join(submodule, fileOrFolder), join(root, fileOrFolder.split('-').slice(-1).join('').trim()), { recursive: true });
    }
  }

  for (const file of walkSync(root, { globs: [`**/*.md`, `**/*.mdx`]})) {
    const content = readFileSync(join(root, file), { encoding: 'utf-8' });
    writeFileSync(join(root, file), preprocess(basename(file, '.md'), content), { encoding: 'utf-8' });
  }
}

const wikilink = [
  wikiLinkPlugin,
  {
    pageResolver: (/** @type {string} */ wikilink) => {
      const paths = walkSync('docs', {
        globs: ["**/" + wikilink + ".md"],
        directories: false,
      }).map((path) => basename(path, '.md'));
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

const name = '谭淞宸的知识库';

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Site metadata
  title: name,
  tagline: '沉淀知识，激发思想',
  url: 'https://notes.tansongchen.com',
  trailingSlash: true,
  baseUrl: '/',
  onBrokenLinks: 'warn',
  favicon: 'favicon.ico',
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // GitHub pages deployment config
  organizationName: 'tansongchen',
  projectName: 'notes',
  githubHost: 'tansongchen',

  plugins: [
    '@docusaurus/plugin-content-pages',
    [
      'docusaurus-plugin-remote-docs',
      /** @type {import('docusaurus-plugin-remote-docs').PluginOptions} */
      ({
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        remarkPlugins: [math, wikilink],
        rehypePlugins: [katex],
        downloader: downloader
      })
    ],
    [
      'docusaurus-plugin-pwa-generator',
      /** @type {import('docusaurus-plugin-pwa-generator').Options} */
      ({
        generatorInput: {
          source: 'static/favicon.ico',
          options: { log: false, padding: '0' }
        },
        partialManifest: {
          "name": name,
          "short_name": name,
          "theme_color": "#c45",
          "background_color": "#222222",
          "display": "standalone",
          "scope": "./",
          "start_url": "./index.html"
        },
      })
    ],
  ],

  themes: [
    [
      '@docusaurus/theme-classic',
      /** @type {import('@docusaurus/theme-classic').Options} */
      {
        customCss: require.resolve('./src/css/custom.css'),
      },
    ],
    // '@docusaurus/theme-search-algolia'
  ],

  themeConfig:
    {
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
        theme: require('prism-react-renderer/themes/github'),
        additionalLanguages: ['julia'],
      },
      colorMode: {
        disableSwitch: true,
      },
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'YOUR_INDEX_NAME',
      // },
    },

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
