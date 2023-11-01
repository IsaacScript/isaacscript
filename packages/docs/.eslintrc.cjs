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
  },
};

module.exports = config;
