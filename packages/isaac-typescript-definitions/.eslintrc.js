/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

module.exports = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "mod.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  rules: {
    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/main/docs/rules/member-ordering.md
     *
     * Not defined in the parent configs.
     *
     * We want class and interface definitions to be alphabetically ordered so that they match the
     * Isaac documentation.
     */
    "isaacscript/member-ordering": [
      "warn",
      {
        default: {
          order: "alphabetically",
        },

        enums: {
          memberTypes: ["method", "field"],
          order: "alphabetically",
        },

        interfaces: {
          memberTypes: ["method", "field"],
          order: "alphabetically",
        },
      },
    ],

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
     * Not defined in parent configs.
     */
    "sort-exports/sort-exports": [
      "error",
      {
        sortDir: "asc",
      },
    ],
  },
};
