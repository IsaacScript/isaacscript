const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
  "configs",
);

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  rules: {
    /**
     * Defined at: base-typescript-eslint.js
     *
     * We commonly get the elements of arrays in a for loop.
     */
    "@typescript-eslint/no-non-null-assertion": "off",

    /**
     * Defined at: base-n.js
     *
     * ESLint plugins do not support ESM until version 9 is released:
     * https://github.com/eslint/eslint/issues/15453#issuecomment-1002015088
     */
    "n/file-extension-in-import": "off",

    /**
     * Defined at: base-eslint.js
     *
     * Some rules use bitwise operators to deal with TypeScript bit flags.
     */
    "no-bitwise": "off",

    /**
     * Defined at: base-eslint.js
     *
     * We commonly trim the incoming text.
     */
    "no-param-reassign": "off",
  },
};

module.exports = config;
