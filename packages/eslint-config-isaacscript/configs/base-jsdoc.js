/**
 * This ESLint config only contains rules from `eslint-plugin-jsdoc`:
 * https://github.com/gajus/eslint-plugin-jsdoc
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  plugins: ["jsdoc"],

  rules: {
    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/check-access": "off",

    /** Superseded by the `isaacscript/limit-jsdoc-comments` rule. */
    "jsdoc/check-alignment": "off",

    /**
     * Disabled since it [does not work with ESLint
     * 8](https://github.com/eslint/eslint/issues/14745).
     */
    "jsdoc/check-examples": "off",

    /** Superseded by the `isaacscript/limit-jsdoc-comments` rule. */
    "jsdoc/check-indentation": "off",

    /**
     * Disabled since this is not a common formatting scheme. It is also not recommended by the
     * plugin authors.
     */
    "jsdoc/check-line-alignment": "off",

    "jsdoc/check-param-names": "error",

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/check-property-names": "off",

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/check-syntax": "off",

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

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/check-types": "off",

    "jsdoc/check-values": "error",
    "jsdoc/empty-tags": "error",
    "jsdoc/implements-on-classes": "error",

    /** Disabled since you cannot configure it with a path to the correct "package.json" file. */
    "jsdoc/imports-as-dependencies": "off",

    "jsdoc/informative-docs": "error",

    /** Superseded by the `isaacscript/jsdoc-full-sentences` rule. */
    "jsdoc/match-description": "off",

    /** Disabled because it is only needed for projects with specific JSDoc requirements. */
    "jsdoc/match-name": "off",

    /** Superseded by the `isaacscript/limit-jsdoc-comments` rule. */
    "jsdoc/multiline-blocks": "off",

    /** Superseded by the `isaacscript/limit-jsdoc-comments` rule. */
    "jsdoc/newline-after-description": "off",

    /**
     * Disabled because it provides little value; it only detects JSDoc comments with tags in them.
     */
    "jsdoc/no-bad-blocks": "off",

    /** Superseded by the `isaacscript/format-jsdoc-comments` rule. */
    "jsdoc/no-blank-block-descriptions": "off",

    /** Superseded by the `isaacscript/no-empty-jsdoc` rule. */
    "jsdoc/no-blank-blocks": "off",

    /** Disabled because it provides little value; the `@default` tag is rare. */
    "jsdoc/no-defaults": "off",

    /** Disabled because it is too project-specific. */
    "jsdoc/no-missing-syntax": "off",

    /** Superseded by the `isaacscript/limit-jsdoc-comments` rule. */
    "jsdoc/no-multi-asterisks": "off",

    /** Disabled because it is intended for disabling of specific language features per-project. */
    "jsdoc/no-restricted-syntax": "off",

    /** The `contexts` option is set to `any` to make the rule stricter. */
    "jsdoc/no-types": [
      "error",
      {
        contexts: ["any"],
      },
    ],

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/no-undefined-types": "off",

    "jsdoc/require-asterisk-prefix": "error",

    /** Superseded by the `isaacscript/jsdoc-complete-sentences` rule. */
    "jsdoc/require-description-complete-sentence": "off",

    /** Disabled because it is overboard for every function to have a description. */
    "jsdoc/require-description": "off",

    /** Disabled because it is overboard for every function to require an example. */
    "jsdoc/require-example": "off",

    /** Disabled because it is overboard for every file to require an overview. */
    "jsdoc/require-file-overview": "off",

    /**
     * The `never` option is provided to make the rule match the format of the official TypeScript
     * codebase.
     */
    "jsdoc/require-hyphen-before-param-description": ["error", "never"],

    /** Disabled since it is overboard for every function to have a JSDoc comment. */
    "jsdoc/require-jsdoc": "off",

    /** The `contexts` option is set to `any` to make the rule stricter. */
    "jsdoc/require-param-description": [
      "error",
      {
        contexts: ["any"],
      },
    ],

    /** The `contexts` option is set to `any` to make the rule stricter. */
    "jsdoc/require-param-name": [
      "error",
      {
        contexts: ["any"],
      },
    ],

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/require-param-type": "off",

    /** Configured to only apply when there are one or more parameters. */
    "jsdoc/require-param": [
      "error",
      {
        contexts: [
          {
            context: "FunctionDeclaration",
            comment: 'JsdocBlock:has(JsdocTag[tag="param"])',
          },
        ],
      },
    ],

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/require-property": "off",

    "jsdoc/require-property-description": "error",
    "jsdoc/require-property-name": "error",

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/require-property-type": "off",

    /** Disabled because it is overboard for every function to document every return value. */
    "jsdoc/require-returns-check": "off",

    /** The `contexts` option is set to `any` to make the rule stricter. */
    "jsdoc/require-returns-description": [
      "error",
      {
        contexts: ["any"],
      },
    ],

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/require-returns-type": "off",

    /** Disabled because it is overboard for every function to document every return value. */
    "jsdoc/require-returns": "off",

    /** Disabled because it is overboard to document every throw statement. */
    "jsdoc/require-throws": "off",

    /** Disabled because it is overboard to document every yield. */
    "jsdoc/require-yields": "off",

    /** Disabled because it is overboard to document every yield. */
    "jsdoc/require-yields-check": "off",

    /**
     * Disabled because it is not very useful. In most cases, a function will only have `@param` and
     * `@return` tags, making sorting unnecessary.
     */
    "jsdoc/sort-tags": "off",

    /** Superseded by the `isaacscript/format-jsdoc-comments` rule. */
    "jsdoc/tag-lines": "off",

    /**
     * Disabled since it is only useful in certain environments (e.g. when your project converts
     * JSDoc comments to Markdown).
     */
    "jsdoc/text-escaping": "off",

    /** Disabled because it is not needed in TypeScript. */
    "jsdoc/valid-types": "off",
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
