const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/**
 * @type {import('@docusaurus/types').DocusaurusConfig}
 */
module.exports = {
  title: "IsaacScript",
  url: "https://isaacscript.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "IsaacScript",
  projectName: "IsaacScript.github.io",
  themeConfig: {
    algolia: {
      appId: "ZCC397CSMF", // cspell:disable-line
      apiKey: "212a5e2442aa0e579f2f7bba22ee529a",
      indexName: "isaacscript",
      contextualSearch: false, // Enabled by default; only useful for versioned sites
    },
    colorMode: {
      defaultMode: "dark",
    },
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
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["lua"],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root.
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/IsaacScript/isaacscript/edit/main/packages/docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  scripts: ["/js/hotkey.js"],
  /*
  plugins: [
    [
      "docusaurus-plugin-typedoc",
      {
        out: "isaacscript-common",
        sort: "source-order", // Needed because enums are sorted alphabetically by default.
        tsconfig: "../isaacscript-common/tsconfig.json",
        readme: "../isaacscript-common/website-root.md",
        entryPoints: [],
        sidebar: {
          readmeLabel: "Introduction",
        },
      },
    ],
  ],
  */
};
