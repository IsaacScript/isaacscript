const path = require("path");
const { DefinePlugin } = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
// Not used directly in playground, because it imports typescript
const { SyntaxKind: LuaSyntaxKind } = require("typescript-to-lua/dist/LuaAST");

const resolve = (query) => path.resolve(__dirname, query);

/** @returns {import('@docusaurus/types').Plugin<any>} */
module.exports = () => ({
    configureWebpack: (config, isServer) => {
        return {
            resolveLoader: {
                // Don't generate worker files in server build, because it overrides client files
                alias: isServer ? { "worker-loader": require.resolve("null-loader") } : {},
            },
            resolve: {
                alias: {
                    // Replace vendored monaco-typescript services build with typescript, already used by typescript-to-lua
                    [require.resolve(
                        "monaco-editor/esm/vs/language/typescript/lib/typescriptServices.js",
                    )]: require.resolve("typescript"),

                    // Exclude builtin monaco-typescript libs
                    [require.resolve("monaco-editor/esm/vs/language/typescript/lib/lib.js")]: resolve(
                        "src/monaco-typescript-lib-stub.ts",
                    ),
                },
            },
            module: {
                rules: [
                    { test: /\.ttf$/, loader: "file-loader" },
                    {
                        test: /\.scss$/,
                        exclude: /\.module\.scss$/,
                        use: [...config.module.rules.find((r) => String(r.test) === "/\\.css$/").use, "sass-loader"],
                    },
                    {
                        test: /\.module\.scss$/,
                        use: [
                            ...config.module.rules.find((r) => String(r.test) === "/\\.module\\.css$/").use,
                            "sass-loader",
                        ],
                    },
                ],
            },
            plugins: [
                new DefinePlugin({ __LUA_SYNTAX_KIND__: JSON.stringify(LuaSyntaxKind) }),
                ...(isServer
                    ? []
                    : [new ForkTsCheckerWebpackPlugin({ typescript: { configFile: resolve("src/tsconfig.json") } })]),
            ],
        };
    },
});
