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
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "mod.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  plugins: [
    /** See the `sort-exports` rule below. */
    "sort-exports",
  ],

  rules: {
    /**
     * Documentation:
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md.
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.ts.
     *
     * Ark120202, the author of TypeScriptToLua, recommends using triple-slash directives.
     */
    "@typescript-eslint/triple-slash-reference": "off",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-hyphen-before-param-description
     *
     * Defined at:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/jsdoc.js
     *
     * Disallow param descriptions, since the API documentation does not contain entries for every
     * parameter.
     */
    "jsdoc/require-param-description": "off",

    /**
     * Documentation: https://github.com/jrdrg/eslint-plugin-sort-exports
     *
     * Not defined in the parent configs.
     */
    "sort-exports/sort-exports": [
      "error",
      {
        sortDir: "asc",
      },
    ],
  },

  overrides: [
    {
      files: ["index.ts"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
    {
      files: ["./src/enums/flags/*.ts"],
      rules: {
        "@typescript-eslint/no-redeclare": "off",
      },
    },
  ],
};

module.exports = config;
