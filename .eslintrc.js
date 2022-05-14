// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    /**
     * The linter base is the shared IsaacScript config:
     * https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/mod.js.
     */
    "eslint-config-isaacscript/mod",
  ],

  parserOptions: {
    /**
     * ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
     * things to lint correctly. We do not point this at "./tsconfig.json" because certain files
     * (such at this file) should be linted but not included in the actual project output.
     */
    project: "./tsconfig.eslint.json",
  },

  rules: {
    /**
     * Documentation:
     * https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md.
     *
     * We want class and interface definitions to be alphabetically ordered so that they match the
     * Isaac documentation.
     */
    "@typescript-eslint/member-ordering": [
      "warn",
      {
        default: {
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
     * Defined at: https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/jsdoc.js
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
