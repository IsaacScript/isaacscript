/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
    title: "IsaacScript",
    // TODO: Remove
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
            logo: { src: "images/isaactearsiconfull.gif" },
            items: [
                { to: "docs/features", label: "Docs", position: "left" },
                { href: "https://discord.gg/isaac", label: "Discord", position: "right" },
                { href: "https://github.com/IsaacScript/IsaacScript", label: "GitHub", position: "right" },
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
                    editUrl: "https://github.com/IsaacScript/IsaacScript.github.io/edit/source/",
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
};
