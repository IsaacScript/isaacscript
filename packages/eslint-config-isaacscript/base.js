// This is a shared configuration file for ESLint:
// https://eslint.org/docs/latest/user-guide/configuring
module.exports = {
  extends: [
    /**
     * The linter base is the Airbnb style guide, which is the most popular JavaScript style guide
     * in the world:
     * https://github.com/airbnb/javascript
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
     * We extend the Airbnb rules with the "recommended", "recommended-requiring-type-checking", and
     * "strict" rules from the "typescript-eslint" plugin, which is also recommended by Matt
     * Turnbull, the author of "airbnb-typescript/base":
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/README.md#recommended
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
     * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
     */
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",

    /**
     * This provides extra miscellaneous rules to keep code safe:
     * https://github.com/IsaacScript/isaacscript/tree/main/packages/eslint-plugin-isaacscript
     */
    "plugin:isaacscript/recommended",

    /**
     * Find unused "eslint-disable" comments:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments
     */
    "plugin:eslint-comments/recommended",

    /** Lint JSDoc comments. */
    "./jsdoc",

    /**
     * Disable any ESLint rules that conflict with Prettier:
     * https://github.com/prettier/eslint-config-prettier
     * (Otherwise, we will have unfixable ESLint errors.)
     */
    "prettier",
  ],

  plugins: [
    /**
     * Use the "eslint-plugin-only-warn" plugin to change all errors to warnings:
     * https://github.com/bfanger/eslint-plugin-only-warn
     *
     * This allows the end-user to more easily distinguish between errors from the TypeScript
     * compiler (which show up in red) and ESLint rule violations (which show up in yellow).
     */
    "only-warn",

    /**
     * Activate the "sort-exports" plugin, which allows the "sort-exports" rule to be optionally
     * enabled on a per-project basis.
     */
    "sort-exports",
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
     * This can modify the type of boolean declarations to "boolean | undefined", which is undesired
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

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/consistent-return
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * We prefer the "noImplicitReturns" compiler flag over the "consistent-return" ESLint rule,
     * since it is type-aware:
     * https://github.com/typescript-eslint/typescript-eslint/issues/5254
     */
    "consistent-return": ["off"],

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/curly
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * Always requiring curly braces can partially ward against Apple-style if statement bugs:
     * https://www.imperialviolet.org/2014/02/22/applebug.html
     *
     * Additionally, this rule needs to be set to "all" to work properly with
     * `eslint-prettier-config`:
     * https://github.com/prettier/eslint-config-prettier#curly
     */
    curly: ["warn", "all"],

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/default-case
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * This rule is generally bad to have on in TypeScript projects:
     * https://github.com/typescript-eslint/typescript-eslint/issues/5254
     */
    "default-case": "off",

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
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-console
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js
     *
     * Command-line programs commonly write to standard out and standard error.
     */
    "no-console": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-constant-binary-expression
     *
     * Not defined in parent configs.
     *
     * This rule was released in 2022 and is known to catch many subtle bugs:
     * https://github.com/eslint/eslint.org/pull/240/files
     */
    "no-constant-binary-expression": "warn",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-continue
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
     *
     * Proper use of continues can reduce indentation for long blocks of code.
     */
    "no-continue": "off",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-plusplus
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
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-restricted-syntax
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
     * Documentation:
     * https://eslint.org/docs/latest/rules/prefer-destructuring
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
     *
     * - Array destructuring can result in non-intuitive code.
     */
    "prefer-destructuring": [
      "warn",
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
  },
};
