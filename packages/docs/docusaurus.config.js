/* eslint-disable @typescript-eslint/lines-around-comment */

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "IsaacScript",
  tagline: undefined,
  favicon: "img/favicon.ico",

  url: "https://isaacscript.github.io",
  baseUrl: "/",

  organizationName: "IsaacScript",
  projectName: "IsaacScript.github.io",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",

      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root.
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/IsaacScript/isaacscript/edit/main/packages/docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themes: ["docusaurus-theme-search-typesense"],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: undefined,

      navbar: {
        title: "IsaacScript",
        logo: {
          alt: "IsaacScript Logo",
          src: "img/isaacscript-logo.png",
        },
        items: [
          { to: "main/features", label: "Main", position: "left" },
          {
            to: "isaac-typescript-definitions",
            label: "isaac-typescript-definitions",
            position: "left",
          },
          {
            to: "isaacscript-common",
            label: "isaacscript-common",
            position: "left",
          },
          {
            to: "eslint-config-isaacscript",
            label: "eslint-config-isaacscript",
            position: "left",
          },
          {
            href: "https://github.com/IsaacScript/isaacscript",
            className: "header-github-link",
            position: "right",
          },
          {
            href: "https://discord.gg/KapmKQ2gUD",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://wofsauge.github.io/IsaacDocs/rep/",
            className: "header-wof-link",
            position: "right",
          },
        ],
      },

      footer: undefined,

      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["lua"],
      },

      typesense: {
        typesenseCollectionName: "isaacscript",
        typesenseServerConfig: {
          nodes: [
            {
              host: "isaacracing.net",
              port: 8108,
              protocol: "https",
            },
          ],
          apiKey: "9AiKF0AGD145wC9fc4NafATcCam89XT7v2NxGf2ymFucN7b6",
        },

        // https://typesense.org/docs/0.21.0/api/search.md#search-parameters
        typesenseSearchParameters: {
          split_join_tokens: "always",
        },

        // https://docusaurus.io/docs/search#contextual-search
        contextualSearch: true,
      },

      colorMode: {
        defaultMode: "dark",
      },
    }),

  scripts: ["/js/hotkey.js"],
};
