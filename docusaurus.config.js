const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "IsaacScript",
  url: "https://isaacscript.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
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
        { to: "docs/features", label: "Docs", position: "left" },
        {
          href: "https://discord.gg/KapmKQ2gUD",
          label: "Discord",
          position: "right",
        },
        {
          href: "https://github.com/IsaacScript/isaacscript",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://wofsauge.github.io/IsaacDocs/rep/",
          label: "API Docs",
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
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/IsaacScript/isaacscript.github.io/edit/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  scripts: ["/js/hotkey.js"],
};
