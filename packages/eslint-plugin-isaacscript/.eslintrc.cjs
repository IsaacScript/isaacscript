const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
  "configs",
);

module.exports = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  rules: {
    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-bitwise
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * Some rules use bitwise operators to deal with TypeScript bit flags.
     */
    "no-bitwise": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-param-reassign
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * We commonly trim the incoming text.
     */
    "no-param-reassign": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-non-null-assertion/
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
     *
     * We commonly get the elements of arrays in a for loop.
     */
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
