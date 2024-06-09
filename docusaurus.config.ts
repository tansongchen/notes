import math from "remark-math";
import katex from "rehype-katex";
import wikiLinkPlugin from "remark-wiki-link";
import walkSync from "walk-sync";
import { basename } from "path";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";

const wikilink = [
  wikiLinkPlugin,
  {
    pageResolver: (wikilink: string) => {
      const paths = walkSync("docs", {
        globs: ["**/" + wikilink + ".md"],
        directories: false,
      }).map((path) => basename(path, ".md"));
      if (paths.length) {
        return paths;
      } else {
        return ["404"];
      }
    },
    hrefTemplate: (permalink: string) => `/${permalink}`,
    aliasDivider: "|",
  },
];

const name = "谭淞宸的知识库";

const config: Config = {
  // Site metadata
  title: name,
  tagline: "沉淀知识，激发思想",
  url: "https://notes.tansongchen.com",
  trailingSlash: true,
  baseUrl: "/",
  onBrokenLinks: "warn",
  favicon: "favicon.ico",
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  // GitHub pages deployment config
  organizationName: "tansongchen",
  projectName: "notes",
  githubHost: "tansongchen",

  plugins: [
    "@docusaurus/plugin-content-pages",
    [
      "@docusaurus/plugin-content-docs",
      {
        routeBasePath: "/",
        sidebarPath: require.resolve("./sidebars.ts"),
        remarkPlugins: [math, wikilink],
        rehypePlugins: [[katex, { strict: false }]],
      },
    ],
    // [
    //   'docusaurus-plugin-pwa-generator',
    //   /** @type {import('docusaurus-plugin-pwa-generator').Options} */
    //   ({
    //     generatorInput: {
    //       source: 'static/favicon.ico',
    //       options: { log: false, padding: '0' }
    //     },
    //     partialManifest: {
    //       "name": name,
    //       "short_name": name,
    //       "theme_color": "#c45",
    //       "background_color": "#222222",
    //       "display": "standalone",
    //       "scope": "./",
    //       "start_url": "./index.html"
    //     },
    //   })
    // ],
  ],

  themes: [
    [
      "@docusaurus/theme-classic",
      /** @type {import('@docusaurus/theme-classic').Options} */
      {
        customCss: require.resolve("./src/css/custom.css"),
      },
    ],
    "@docusaurus/theme-search-algolia",
  ],

  themeConfig: {
    navbar: {
      title: "谭淞宸的知识库",
      logo: {
        alt: "谭淞宸的知识库",
        src: "favicon.ico",
        width: 32,
        height: 32,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "profession",
          position: "left",
          label: "职业/工作",
        },
        {
          type: "docSidebar",
          sidebarId: "development",
          position: "left",
          label: "成长/学习",
        },
        {
          type: "docSidebar",
          sidebarId: "creation",
          position: "left",
          label: "创造/兴趣",
        },
        {
          href: "https://tansongchen.com",
          label: "个人网站",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `CC-BY-SA 4.0 © 2022 - ${new Date().getFullYear()} 谭淞宸`,
    },
    prism: {
      theme: themes.github,
      additionalLanguages: ["julia"],
    },
    colorMode: {
      disableSwitch: true,
    },
    algolia: {
      appId: "XKUOJXYA5Q",
      apiKey: "5425f6587bc422d9072133928beff51c",
      indexName: "notes",
    },
  },

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

export default config;
