// This is a shared configuration file for ESLint:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  plugins: [
    /** Lint JSDoc style comments: https://github.com/gajus/eslint-plugin-jsdoc */
    "jsdoc",
  ],

  rules: {
    // jsdoc/check-access         - Not needed in TypeScript.
    // jsdoc/check-alignment      - Overlaps with `isaacscript-limit-jsdoc-comments`.
    // jsdoc/check-examples       - Not worth it since some ESLint rules may not apply to examples.
    // jsdoc/check-indentation    - Overlaps with `isaacscript-limit-jsdoc-comments`.
    // jsdoc/check-line-alignment - This is not a common formatting scheme in the wild. It's also
    //                              not recommended by the plugin.

    /**
     * Documentation: https://github.com/gajus/eslint-plugin-jsdoc#check-param-names
     *
     * Ensures that parameter names in JSDoc match those in the function declaration.
     */
    "jsdoc/check-param-names": "warn",

    // jsdoc/check-property-names - Not needed in TypeScript.
    // jsdoc/check-syntax         - Not needed in TypeScript.

    /**
     * Documentation: https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names
     *
     * Allow the use of TypeScriptToLua compiler annotations as documented here:
     * https://typescripttolua.github.io/docs/advanced/compiler-annotations
     */
    "jsdoc/check-tag-names": [
      "warn",
      {
        definedTags: [
          "category", // Used in TypeDoc
          "hidden", // Used in TypeDoc
          "internal", // Used by TypeScript
          "noResolution", // Used in TypeScriptToLua as a compiler annotation
          "noSelf", // Used in TypeScriptToLua as a compiler annotation
        ],
      },
    ],

    // jsdoc/check-types - Not needed in TypeScript.

    /**
     * Documentation: https://github.com/gajus/eslint-plugin-jsdoc#check-values
     *
     * Validates the content of some uncommon JSDoc tags.
     */
    "jsdoc/check-values": "warn",

    /**
     * Documentation: https://github.com/gajus/eslint-plugin-jsdoc#check-values
     *
     * Validates that specific tags are never empty.
     */
    "jsdoc/empty-tags": "warn",

    /**
     * Documentation: https://github.com/gajus/eslint-plugin-jsdoc#implements-on-classes
     *
     * Reports issues with incorrect usage of `@implements`.
     */
    "jsdoc/implements-on-classes": "warn",

    // jsdoc/match-description - Overlaps with `isaacscript-jsdoc-full-sentences`.
  },
};
