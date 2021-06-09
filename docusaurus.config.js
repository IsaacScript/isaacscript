/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "IsaacScript",
    tagline: "",
    url: "https://isaacscript.github.io",
    baseUrl: "/",
    favicon: "images/favicon.ico",
    themeConfig: {
        colorMode: {
            defaultMode: "dark",
        },
        navbar: {
            title: "IsaacScript",
            logo: { src: "images/isaacscript-logo.png" },
            items: [
                { to: "docs/features", label: "Docs", position: "left" },
                { href: "https://discord.gg/KapmKQ2gUD", label: "Discord", position: "right" },
                { href: "https://github.com/IsaacScript/isaacscript", label: "GitHub", position: "right" },
                { href: "https://wofsauge.github.io/IsaacDocs/rep/", label: "API Docs", position: "right" },
            ],
        },
        prism: {
            additionalLanguages: ["lua"],
            theme: require("prism-react-renderer/themes/github"),
            darkTheme: require("prism-react-renderer/themes/vsDark"),
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    sidebarPath: require.resolve("./sidebars.json"),
                    editUrl: "https://github.com/IsaacScript/isaacscript.github.io/edit/main/",
                },
                theme: {
                    customCss: require.resolve("./src/custom.scss"),
                },
                pages: {
                    include: ["index.tsx", "play/index.tsx", "benchviz/index.tsx"],
                },
            },
        ],
    ],
    plugins: [require.resolve("./docusaurus-plugin")],
    scripts: ['/js/hotkey.js'],

    // Deployment settings
    // https://v2.docusaurus.io/docs/deployment
    url: 'https://isaacscript.github.io',
    baseUrl: '/',
    projectName: 'IsaacScript.github.io',
    organizationName: 'IsaacScript',
};
