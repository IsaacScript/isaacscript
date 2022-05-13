// This is a shared configuration file for ESLint:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  plugins: [
    /** Lint JSDoc style comments: https://github.com/gajus/eslint-plugin-jsdoc */
    "jsdoc",
  ],

  /**
   * Instead of using the recommended config, we specifically turn on every rule that is useful.
   *
   * We must specify `contexts: ["any"]` for some rules because by default, only a subset of AST
   * node types will be affected.
   */
  rules: {
    // - jsdoc/check-access - Not needed in TypeScript.
    // - jsdoc/check-alignment - Overlaps with `isaacscript/limit-jsdoc-comments`.
    // - jsdoc/check-examples - Not worth it since some ESLint rules may not apply to examples.
    // - jsdoc/check-indentation - Overlaps with `isaacscript/limit-jsdoc-comments`.
    // - jsdoc/check-line-alignment - This is not a common formatting scheme in the wild. It's also
    //   not recommended by the plugin.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-param-names
     *
     * Ensures that parameter names in JSDoc match those in the function declaration.
     */
    "jsdoc/check-param-names": "warn",

    // - jsdoc/check-property-names - Not needed in TypeScript.
    // - jsdoc/check-syntax - Not needed in TypeScript.

    /**
     * Documentation: https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names
     *
     * Reports invalid block tag names.
     */
    "jsdoc/check-tag-names": [
      "warn",
      {
        definedTags: [
          // Used by the TypeScript compiler:
          // https://www.typescriptlang.org/tsconfig#stripInternal
          "internal", // Used by TypeScript

          // Add tags used in TypeDoc:
          // https://typedoc.org/guides/doccomments/
          "category",
          "hidden",

          // Add tags used in TypeScriptToLua:
          // https://typescripttolua.github.io/docs/advanced/compiler-annotations
          "noResolution",
          "noSelf",
        ],
      },
    ],

    // - jsdoc/check-types - Not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-values
     *
     * Validates the content of some uncommon JSDoc tags.
     */
    "jsdoc/check-values": "warn",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-values
     *
     * Validates that specific tags are never empty.
     */
    "jsdoc/empty-tags": "warn",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#implements-on-classes
     *
     * Reports issues with incorrect usage of `@implements`.
     */
    "jsdoc/implements-on-classes": "warn",

    // - jsdoc/match-description - Overlaps with `isaacscript/jsdoc-full-sentences`.
    // - jsdoc/match-name - Only needed for projects with specific JSDoc requirements.
    // - jsdoc/multiline-blocks - Overlaps with `isaacscript/limit-jsdoc-comments`.
    // - jsdoc/newline-after-description - Overlaps with `isaacscript/limit-jsdoc-comments`.
    // - jsdoc/no-bad-blocks - Provides little value, since it only detects JSDoc comments with tags
    //   in them.
    // - jsdoc/no-defaults - Provides little value, since the @default tag is rare.
    // - jsdoc/no-missing-syntax - Not generally relevant.
    // - jsdoc/no-multi-asterisks - Overlaps with `isaacscript/limit-jsdoc-comments`.
    // - jsdoc/no-restricted-syntax - Not generally relevant.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#no-types
     *
     * Disallows types being used on `@param` or `@returns`.
     */
    "jsdoc/no-types": [
      "warn",
      {
        contexts: ["any"],
      },
    ],

    // - jsdoc/no-undefined-types - Not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-asterisk-prefix
     *
     * Requires that each JSDoc line starts with an `*`.
     */
    "jsdoc/require-asterisk-prefix": "warn",

    // - jsdoc/require-description-complete-sentence - Overlaps with
    //   `isaacscript/jsdoc-complete-sentences`.
    // - jsdoc/require-description - It's overboard for every function to have a description.
    // - jsdoc/require-example - It's overboard for every function to require an example.
    // - jsdoc/require-file-overview - It's overboard for every file to require an overview.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-hyphen-before-param-description
     *
     * Disallow hyphens before parameter descriptions, as it is non-standard syntax.
     */
    "jsdoc/require-hyphen-before-param-description": ["warn", "never"],

    // - jsdoc/require-jsdoc - It's overboard for every function to have a JSDoc comment.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-param-description
     *
     * Requires that each `@param` tag has a description.
     */
    "jsdoc/require-param-description": [
      "warn",
      {
        contexts: ["any"],
      },
    ],

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-param-name
     *
     * Requires that each `@param` tag has a name.
     */
    "jsdoc/require-param-name": [
      "warn",
      {
        contexts: ["any"],
      },
    ],

    // - jsdoc/require-param-type - Not needed in TypeScript.
    // - jsdoc/require-param - It's overboard for every function to document every parameter.
    // - jsdoc/require-property - Probably not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-property-description
     *
     * Requires that each `@property` tag has a description.
     */
    "jsdoc/require-property-description": "warn",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-property-name
     *
     * Requires that each `@property` tag has a name.
     */
    "jsdoc/require-property-name": "warn",

    // - jsdoc/require-property-type - Not needed in TypeScript.
    // - jsdoc/require-returns-check - It's overboard for every function to document every return
    //   value.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-returns-description
     *
     * Requires that each `@returns` tag has a description.
     */
    "jsdoc/require-returns-description": [
      "warn",
      {
        contexts: ["any"],
      },
    ],

    // - jsdoc/require-returns-type - Not needed in TypeScript.
    // - jsdoc/require-returns - It's overboard for every function to document every return value.
    // - jsdoc/require-throws - It's overboard to document every throw statement.
    // - jsdoc/require-yields - It's overboard to document every yield.
    // - jsdoc/require-yields-check - It's overboard to document every yield.
    // - jsdoc/sort-tags - Not very useful since there are typically only `@param` and `@return`
    //   tags.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#tag-lines
     *
     * Enforces no lines between tags.
     */
    "jsdoc/tag-lines": "warn",

    // - jsdoc/valid-types - Not needed in TypeScript.
  },
};
