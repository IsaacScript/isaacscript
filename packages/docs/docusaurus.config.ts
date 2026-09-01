import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.vsDark;

const config: Config = {
  title: "IsaacScript",
  url: "https://isaacscript.github.io",
  baseUrl: "/",
  favicon: "img/favicon.ico",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  onBrokenAnchors: "ignore", // This has false positives, so we have to ignore it.
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",

  tagline: undefined,
  organizationName: "IsaacScript",
  projectName: "IsaacScript.github.io",

  themeConfig: {
    navbar: {
      title: "IsaacScript",
      items: [
        {
          to: "main/features",
          label: "Main",
          position: "left",
        },
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
      logo: {
        alt: "IsaacScript Logo",
        src: "img/isaacscript-logo.png",
      },
    },

    colorMode: {
      defaultMode: "dark",
    },

    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["lua"],
    },

    footer: undefined,

    typesense: {
      // https://docusaurus.io/docs/search#contextual-search
      contextualSearch: true,

      typesenseCollectionName: "isaacscript",

      // https://typesense.org/docs/0.21.0/api/search.md#search-parameters
      typesenseSearchParameters: {
        split_join_tokens: "always",
      },

      typesenseServerConfig: {
        apiKey: "9AiKF0AGD145wC9fc4NafATcCam89XT7v2NxGf2ymFucN7b6",
        nodes: [
          {
            host: "isaacracing.net",
            port: 8108,
            protocol: "https",
          },
        ],
      },
    },
  } satisfies Preset.ThemeConfig,

  themes: ["docusaurus-theme-search-typesense"],

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root.
          editUrl:
            "https://github.com/IsaacScript/isaacscript/edit/main/packages/docs",
          sidebarPath: "./sidebars.ts",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  scripts: ["/js/hotkey.js"],

  // Needed so that the following text works properly: `1 << -1 (0)`
  // https://github.com/tgreyuk/typedoc-plugin-markdown/issues/502
  markdown: {
    format: "detect",
  },
};

export default config;
