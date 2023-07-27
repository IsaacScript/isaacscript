/**
 * This ESLint config only contains rules from `eslint-plugin-jsdoc`:
 * https://github.com/gajus/eslint-plugin-jsdoc
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // Instead of using the recommended config, we specifically turn on every rule that is useful.
  plugins: ["jsdoc"],

  // https://github.com/gajus/eslint-plugin-jsdoc#rules
  // - We must specify `contexts: ["any"]` for some rules because by default, only a subset of AST
  //   node types will be affected.
  // - An `[X]` indicates that the rule is not explicitly not enabled for a particular reason.
  rules: {
    // [X] "jsdoc/check-access" is not enabled because it is not needed in TypeScript.

    // [X] "jsdoc/check-alignment" is not enabled because it overlaps with
    // `isaacscript/limit-jsdoc-comments`.

    // [X] "jsdoc/check-examples" is not enabled since it does not work with ESLint 8:
    // https://github.com/eslint/eslint/issues/14745

    // [X] "jsdoc/check-indentation" is not enabled since it overlaps with
    // `isaacscript/limit-jsdoc-comments`.

    // [X] "jsdoc/check-line-alignment" is not enabled because this is not a common formatting
    // scheme in the wild. It is also not recommended by the plugin.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-param-names
     *
     * Ensures that parameter names in JSDoc match those in the function declaration.
     */
    "jsdoc/check-param-names": "error",

    // [X] "jsdoc/check-property-names" is not enabled because it is not needed in TypeScript.

    // [X] "jsdoc/check-syntax" is not enabled because it is not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-tag-names
     *
     * Reports invalid block tag names.
     */
    "jsdoc/check-tag-names": [
      "error",
      {
        definedTags: [
          // Ignore tags used by the TypeScript compiler:
          // https://www.typescriptlang.org/tsconfig#stripInternal
          "internal", // Used by TypeScript

          // Ignore tags used in TypeDoc:
          // https://typedoc.org/guides/doccomments/
          "category",
          "hidden",
          "notExported", // From: typedoc-plugin-not-exported
          "rename", // From: typedoc-plugin-rename

          // Ignore tags used in TypeScriptToLua:
          // https://typescripttolua.github.io/docs/advanced/compiler-annotations
          "noResolution",
          "noSelf",
          "noSelfInFile",

          // Ignore tags used in `ts-json-schema-generator`:
          // https://github.com/vega/ts-json-schema-generator
          "minimum",
          "maximum",

          // Ignore tags used in `eslint-plugin-isaacscript`:
          // https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/require-variadic-function-argument.md
          "allowEmptyVariadic",
        ],
      },
    ],

    // [X] "jsdoc/check-types" is not enabled because it is not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-values
     *
     * Validates the content of some uncommon JSDoc tags.
     */
    "jsdoc/check-values": "error",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#check-values
     *
     * Validates that specific tags are never empty.
     */
    "jsdoc/empty-tags": "error",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#implements-on-classes
     *
     * Reports issues with incorrect usage of `@implements`.
     */
    "jsdoc/implements-on-classes": "error",

    // [X] "jsdoc/match-description" is not enabled because it overlaps with
    // `isaacscript/jsdoc-full-sentences`.

    // [X] "jsdoc/match-name" is not enabled because it is only needed for projects with specific
    // JSDoc requirements.

    // [X] "jsdoc/multiline-blocks" is not enabled because it overlaps with
    // `isaacscript/limit-jsdoc-comments`.

    // [X] "jsdoc/newline-after-description" is not enabled because it overlaps with
    // `isaacscript/limit-jsdoc-comments`.

    // [X] "jsdoc/no-bad-blocks" is not enabled because it provides little value, since it only
    // detects JSDoc comments with tags in them.

    // [X] "jsdoc/no-defaults" is not enabled because it provides little value. (The `@default` tag
    // is rare.)

    // [X] "jsdoc/no-missing-syntax" is not enabled because it is not generally relevant.

    // [X] "jsdoc/no-multi-asterisks" is not enabled because it overlaps with
    // `isaacscript/limit-jsdoc-comments`.

    // [X] "jsdoc/no-restricted-syntax" is not enabled because it is not generally relevant.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#no-types
     *
     * Disallows types being used on `@param` or `@returns`.
     */
    "jsdoc/no-types": [
      "error",
      {
        contexts: ["any"],
      },
    ],

    // [X] "jsdoc/no-undefined-types" is not enabled because it is not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-asterisk-prefix
     *
     * Requires that each JSDoc line starts with an `*`.
     */
    "jsdoc/require-asterisk-prefix": "error",

    // [X] "jsdoc/require-description-complete-sentence" is not enabled because it overlaps with
    // `isaacscript/jsdoc-complete-sentences`.

    // [X] "jsdoc/require-description" is not enabled because it is overboard for every function to
    // have a description.

    // [X] "jsdoc/require-example" is not enabled because it is overboard for every function to
    // require an example.

    // [X] "jsdoc/require-file-overview" is not enabled because it is overboard for every file to
    // require an overview.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-hyphen-before-param-description
     *
     * Disallow hyphens before parameter descriptions, as it is non-standard syntax.
     */
    "jsdoc/require-hyphen-before-param-description": ["error", "never"],

    // [X] "jsdoc/require-jsdoc" is not enabled since it is overboard for every function to have a
    // JSDoc comment.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-param-description
     *
     * Requires that each `@param` tag has a description.
     */
    "jsdoc/require-param-description": [
      "error",
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
      "error",
      {
        contexts: ["any"],
      },
    ],

    // [X] "jsdoc/require-param-type" is not enabled because it is not needed in TypeScript.

    "jsdoc/require-param": [
      "error",
      {
        // We only activate the rule when there are one or more parameters.
        // https://github.com/gajus/eslint-plugin-jsdoc/issues/920
        contexts: [
          {
            context: "FunctionDeclaration",
            comment: 'JsdocBlock:has(JsdocTag[tag="param"])',
          },
        ],
      },
    ],

    // [X] "jsdoc/require-property" is not enabled because it is not needed in TypeScript.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-property-description
     *
     * Requires that each `@property` tag has a description.
     */
    "jsdoc/require-property-description": "error",

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-property-name
     *
     * Requires that each `@property` tag has a name.
     */
    "jsdoc/require-property-name": "error",

    // [X] "jsdoc/require-property-type" is not enabled because it is not needed in TypeScript.

    // [X] "jsdoc/require-returns-check" is not enabled because it is overboard for every function
    // to document every return value.

    /**
     * Documentation:
     * https://github.com/gajus/eslint-plugin-jsdoc#require-returns-description
     *
     * Requires that each `@returns` tag has a description.
     */
    "jsdoc/require-returns-description": [
      "error",
      {
        contexts: ["any"],
      },
    ],

    // [X] "jsdoc/require-returns-type" is not enabled because it is not needed in TypeScript.

    // [X] "jsdoc/require-returns" is not enabled because it is overboard for every function to
    // document every return value.

    // [X] "jsdoc/require-throws" is not enabled because it is overboard to document every throw
    // statement.

    // [X] "jsdoc/require-yields" is not enabled because it is overboard to document every yield.

    // [X] "jsdoc/require-yields-check" is not enabled because it is overboard to document every
    // yield.

    // [X] "jsdoc/sort-tags" is not enabled because it is not very useful. (In most cases, a
    // function will only have `@param` and `@return` tags, making sorting unnecessary.)

    // [X] "jsdoc/tag-lines" is not enabled because it overlaps with
    // `isaacscript/format-jsdoc-comments`.

    // [X] "jsdoc/valid-types" is not enabled because it is not needed in TypeScript.
  },

  overrides: [
    // Disable some TypeScript-specific rules in JavaScript files.
    {
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        "jsdoc/no-types": "off",
      },
    },
  ],
};

module.exports = config;
