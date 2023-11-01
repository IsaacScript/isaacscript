// This is the configuration file for Prettier, the auto-formatter:
// https://prettier.io/docs/en/configuration.html

/** @type {import("prettier").Config} */
const config = {
  plugins: [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson",
    "@prettier/plugin-xml",
  ],

  overrides: [
    // Allow proper formatting of JSONC files:
    // https://github.com/prettier/prettier/issues/5708
    {
      files: [
        "**/*.jsonc",
        "**/.vscode/*.json",
        "**/tsconfig.json",
        "**/tsconfig.*.json",
      ],
      options: {
        parser: "json5",
        quoteProps: "preserve",
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
};

export default config;
