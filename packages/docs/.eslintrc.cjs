const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),

    "plugin:@docusaurus/recommended",
  ],

  env: {
    browser: true,
  },

  ignorePatterns: ["**/build/**", "**/docusaurus/**"],

  rules: {
    "import/no-default-export": "off", // React uses default exports.
    "n/file-extension-in-import": "off", // Docusaurus does not yet use ESM.
    "no-alert": "off",

    // This rule has to be told which "package.json" file that the dependencies are located in. (The
    // "package.json" file for the "docs" package does not contain any of the actual dependencies.)
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: REPO_ROOT,
      },
    ],
  },

  overrides: [
    // The "isaacscript-common-node" dependency is used in scripts and should never appear in a
    // "package.json" file (if it is only used in script files).
    {
      files: ["**/scripts/*.{ts,cts,mts}"],
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
  ],
};

module.exports = config;
