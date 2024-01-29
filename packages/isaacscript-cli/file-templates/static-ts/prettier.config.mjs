// This is the configuration file for Prettier, the auto-formatter:
// https://prettier.io/docs/en/configuration.html

/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-organize-imports", // Prettier does not format imports by default.
    "prettier-plugin-packagejson", // Prettier does not format "package.json" by default.
  ],

  overrides: [
    // Allow proper formatting of JSONC files that have JSON file extensions:
    // https://github.com/prettier/prettier/issues/5708
    {
      files: [
        "**/.vscode/*.json",
        // "tsconfig.json" is automatically handled.
        "**/tsconfig.*.json",
      ],
      options: {
        parser: "jsonc",
      },
    },
  ],
};

export default config;
