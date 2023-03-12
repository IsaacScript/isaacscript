/**
 * This config only contains rules from `@typescript-eslint` plugin.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  /** This plugin has three separate configs that are recommended to extend from. */
  extends: [
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
    "plugin:@typescript-eslint/recommended",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
    "plugin:@typescript-eslint/strict",
  ],

  rules: {
    /**
     * Documentation:
     * https://typescript-eslint.io/rules/array-type
     *
     * Not defined in the parent configs.
     *
     * Prefer the "string[]" syntax over "Array<string>".
     */
    "@typescript-eslint/array-type": [
      "warn",
      {
        default: "array-simple",
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/explicit-module-boundary-types
     *
     * Not defined in the parent configs.
     *
     * Specifying explicit return types can help prevent bugs, but only require it on exported
     * functions.
     */
    "@typescript-eslint/explicit-module-boundary-types": "warn",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/lines-between-class-members
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * Airbnb has "exceptAfterSingleLine" turned off by default. A list of single-line variable
     * declarations at the top of a class is common in TypeScript.
     */
    "@typescript-eslint/lines-between-class-members": [
      "warn",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/naming-convention
     *
     * Defined at:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     *
     * Modify the Airbnb config to allow for a leading underscore, which signifies that it is
     * temporarily not being used.
     */
    "@typescript-eslint/naming-convention": [
      "warn",
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables
      // (23.10).
      {
        selector: "variable",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8).
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow",
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make
      // TypeScript recommendations, we are assuming this rule would similarly apply to anything
      // "type like", including interfaces, type aliases, and enums.
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-confusing-void-expression
     *
     * Not defined in the parent configs.
     *
     * This prevents assigning void to variables, which is almost certainly a bug.
     */
    "@typescript-eslint/no-confusing-void-expression": "warn",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
     *
     * Not defined in the parent configs.
     *
     * This prevents useless code after refactoring variables to pure booleans.
     */
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-unused-vars
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js
     *
     * We want to lint unused arguments (the default is "after-used"). We also want to ignore
     * arguments/variables that start with an underscore. This matches the behavior of the
     * TypeScript compiler flag "--noUnusedLocals".
     */
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        args: "all",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-use-before-define
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js
     *
     * This allows code to be structured in a more logical order.
     */
    "@typescript-eslint/no-use-before-define": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/prefer-optional-chain
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
     *
     * This can modify the type of boolean declarations to `boolean | undefined`, which is undesired
     * in some circumstances:
     * https://github.com/typescript-eslint/typescript-eslint/issues/5269
     */
    "@typescript-eslint/prefer-optional-chain": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/quotes
     *
     * Defined at:
     * https://github.com/prettier/eslint-config-prettier/blob/main/%40typescript-eslint.js
     *
     * In order to forbid unnecessary backticks, we must re-enable the "@typescript-eslint/quotes"
     * rule as specified in the eslint-config-prettier documentation:
     * https://github.com/prettier/eslint-config-prettier#enforce-backticks
     */
    "@typescript-eslint/quotes": [
      "warn",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/restrict-template-expressions
     *
     * Defined at:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
     *
     * This rule disallows booleans and nulls in template expressions. However, a common use-case of
     * template strings is to coerce everything to a string.
     */
    "@typescript-eslint/restrict-template-expressions": "off",

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/strict-boolean-expressions
     *
     * Not defined in the parent configs.
     *
     * This rule prevents bugs when refactoring a boolean to a number.
     */
    "@typescript-eslint/strict-boolean-expressions": [
      "warn",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],

    /**
     * Documentation:
     * https://typescript-eslint.io/rules/switch-exhaustiveness-check/
     *
     * Not defined in the parent configs.
     *
     * This rule ensures type-safety with switch statements, which can be especially helpful when
     * values are added or removed from an enum.
     */
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
  },

  overrides: [
    // Disable some TypeScript-specific rules in JavaScript files.
    {
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
      },
    },
  ],
};

module.exports = config;
