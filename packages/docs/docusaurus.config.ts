import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes } from "prism-react-renderer";

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.vsDark;

const config: Config = {
  title: "IsaacScript",
  tagline: undefined,
  favicon: "img/favicon.ico",

  url: "https://isaacscript.github.io",
  baseUrl: "/",

  organizationName: "IsaacScript",
  projectName: "IsaacScript.github.io",

  onBrokenAnchors: "ignore", // This has false positives, so we have to ignore it.
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  onDuplicateRoutes: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root.
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/IsaacScript/isaacscript/edit/main/packages/docs",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
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
  } satisfies Preset.ThemeConfig,

  // -------------------------
  // Added fields from vanilla
  // -------------------------

  // Needed so that the following text works properly: `1 << -1 (0)`
  // https://github.com/tgreyuk/typedoc-plugin-markdown/issues/502
  markdown: {
    format: "detect",
  },

  scripts: ["/js/hotkey.js"],
  themes: ["docusaurus-theme-search-typesense"],
};

export default config;
