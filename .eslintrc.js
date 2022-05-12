// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    /**
     * The linter base is the Airbnb style guide, which is the most popular JavaScript style guide
     * in the world: https://github.com/airbnb/javascript
     *
     * The actual ESLint config is located here:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules
     */
    "airbnb-base",

    /**
     * The TypeScript config extends it:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     * (This includes the "parser" declaration of "@typescript-eslint/parser".)
     */
    "airbnb-typescript/base",

    /**
     * We extend the Airbnb rules with the "recommended" and "recommended-requiring-type-checking"
     * rules from the "typescript-eslint" plugin, which is also recommended by Matt Turnbull, the
     * author of "airbnb-typescript/base":
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/README.md#recommended
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
     */
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    /** We eat our own dog food. */
    "plugin:isaacscript/all",

    /**
     * Find unused "eslint-disable" comments:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments
     */
    "plugin:eslint-comments/recommended",

    /**
     * Disable any ESLint rules that conflict with Prettier:
     * https://github.com/prettier/eslint-config-prettier
     * (Otherwise, we will have unfixable ESLint errors.)
     */
    "prettier",
  ],

  parserOptions: {
    /**
     * ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
     * things to lint correctly. We do not point this at "./tsconfig.json" because certain files
     * (such at this file) should be linted but not included in the actual project output.
     */
    project: "./tsconfig.eslint.json",
  },

  plugins: [
    /**
     * Use the "eslint-plugin-only-warn" plugin to change all errors to warnings:
     * https://github.com/bfanger/eslint-plugin-only-warn
     *
     * This allows the end-user to more easily distinguish between errors from the TypeScript
     * compiler (which show up in red) and ESLint rule violations (which show up in yellow).
     */
    "only-warn",
  ],

  rules: {
    /**
     * Documentation:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md
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
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
     *
     * Not defined in the parent configs.
     *
     * Specifying explicit return types can help prevent bugs, but only require it on exported
     * functions.
     */
    "@typescript-eslint/explicit-module-boundary-types": "warn",

    /**
     * Documentation:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/lines-between-class-members.md
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
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
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
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
     *
     * Not defined in the parent configs.
     *
     * This prevents useless code after refactoring variables to pure booleans.
     */
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "warn",

    /**
     * Documentation:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-unused-vars.md
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
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/no-use-before-define.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js
     *
     * This allows code to be structured in a more logical order.
     */
    "@typescript-eslint/no-use-before-define": "off",

    /**
     * Documentation:
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/quotes.md
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
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
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
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
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
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/disable-enable-pair.md
     *
     * Defined at:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/lib/configs/recommended.js
     *
     * By default, it does not allow "eslint-disable" comments for a whole file, which is standard
     * practice.
     */
    "eslint-comments/disable-enable-pair": [
      "warn",
      {
        allowWholeFile: true,
      },
    ],

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-unlimited-disable.md
     *
     * Defined at:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/lib/configs/recommended.js
     *
     * If a line breaks two or more ESLint rules, then it is useful to use a single "eslint-disable"
     * comment.
     */
    "eslint-comments/no-unlimited-disable": "off",

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-unused-disable.md
     *
     * Not defined in the parent configs.
     *
     * This can help clean up unnecessary comments.
     */
    "eslint-comments/no-unused-disable": "warn",

    /**
     * Documentation:
     * https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     *
     * The case against default exports is layed out here:
     * https://basarat.gitbook.io/typescript/main-1/defaultisbad
     */
    "import/prefer-default-export": "off",

    /**
     * Documentation: https://eslint.org/docs/rules/no-console
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js
     *
     * Command-line programs commonly write to standard out and standard error.
     */
    "no-console": "off",

    /**
     * Documentation: https://eslint.org/docs/rules/no-continue
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * Proper use of continues can reduce indentation for long blocks of code.
     */
    "no-continue": "off",

    /**
     * Documentation: https://eslint.org/docs/rules/no-param-reassign
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     */
    "no-param-reassign": "off",

    /**
     * Documentation: https://eslint.org/docs/rules/no-plusplus
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * Airbnb disallows these because it can lead to errors with minified code. We don't have to
     * worry about this in for loops though.
     */
    "no-plusplus": [
      "warn",
      {
        allowForLoopAfterthoughts: true,
      },
    ],

    /**
     * Documentation: https://eslint.org/docs/rules/no-restricted-syntax
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * - We move the selector for "for..of" loops, since they are commonly used.
     * - We add a selector for "empty" invocations of the "array.push()" method.
     */
    "no-restricted-syntax": [
      "warn",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message:
          "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
      {
        selector:
          "CallExpression[callee.property.name='push'][arguments.length=0]",
        message: "push must always be called with at least one argument.",
      },
    ],

    /**
     * Documentation: https://eslint.org/docs/rules/prefer-destructuring
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
     *
     * - Array destructuring can result in non-intuitive code.
     * - Object destructuring is disgustingly verbose in TypeScript.
     */
    "prefer-destructuring": "off",
  },
};
