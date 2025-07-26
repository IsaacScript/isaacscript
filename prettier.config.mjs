// This is the configuration file for Prettier, the auto-formatter:
// https://prettier.io/docs/en/configuration.html

// @ts-check

/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-organize-imports", // Prettier does not format imports by default.
    "prettier-plugin-packagejson", // Prettier does not format "package.json" by default.
    "@prettier/plugin-xml", // Prettier does not format XML files by default.
  ],

  overrides: [
    // Allow proper formatting of JSONC files that have JSON file extensions.
    {
      files: ["**/.vscode/*.json", "**/tsconfig.json", "**/tsconfig.*.json"],
      options: {
        parser: "jsonc",
      },
    },

    // Allow proper formatting of XML files:
    // https://github.com/prettier/plugin-xml#configuration
    {
      files: ["**/*.xml"],
      options: {
        // The default is "strict". However, whitespace cannot be reformatted unless this is set to
        // "ignore".
        xmlWhitespaceSensitivity: "ignore",

        // Prettier's default value is 80, but this causes XML files in particular to become
        // difficult to work with.
        printWidth: 1_000_000,
      },
    },
  ],

  // We break from the default Prettier config for only a single option: operator position. There
  // are no known arguments for placing operators at the end of the line, as outlined in this
  // thread: https://github.com/prettier/prettier/issues/3806
  experimentalOperatorPosition: "start",
};

export default config;
