// This is a shared configuration file for ESLint:
// https://eslint.org/docs/latest/user-guide/configuring
// This config only contains modifications to the built-in rules from the ESLint tool.
module.exports = {
  rules: {
    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/array-callback-return
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js
     *
     * Airbnb changes the default options for some reason, which makes the rule less strict.
     */
    "array-callback-return": ["warn", {}],

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
     * Airbnb disallows these because it can lead to errors with minified code. When using Prettier,
     * it adds semi-colons everywhere, so we don't have to worry about this.
     */
    "no-plusplus": "off",

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
     * https://eslint.org/docs/latest/rules/no-unused-expressions
     *
     * Not defined in parent configs.
     *
     * An unused expression which has no effect on the state of the program indicates a logic error.
     */
    "no-unused-expressions": "warn",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/prefer-destructuring
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
     *
     * Array destructuring can result in non-intuitive code.
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

    // "constructor-super" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "for-direction" is enabled here:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js

    // "getter-return" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-async-promise-executor"

    // "no-await-in-loop"

    // "no-class-assign"

    // "no-compare-neg-zero"

    // "no-cond-assign"

    // "no-const-assign" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-constant-binary-expression"

    // "no-constant-condition"

    // "no-constructor-return"

    // "no-control-regex"

    // "no-debugger"

    // "no-dupe-args" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-dupe-class-members" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-dupe-else-if"

    // "no-dupe-keys" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-duplicate-case"

    // "no-duplicate-imports"

    // "no-empty-character-class"

    // "no-empty-pattern"

    // "no-ex-assign"

    // "no-fallthrough"

    // "no-func-assign" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-import-assign" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-inner-declarations"

    // "no-invalid-regexp"

    // "no-irregular-whitespace"

    // "no-loss-of-precision"

    // "no-misleading-character-class"

    // "no-new-native-nonconstructor"

    // "no-new-symbol" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-obj-calls" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-promise-executor-return"

    // "no-prototype-builtins"

    // "no-self-assign"

    // "no-self-compare"

    // "no-setter-return"

    // "no-sparse-arrays"

    // "no-template-curly-in-string"

    // "no-redeclare" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-setter-return" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-this-before-super" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-undef" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-unreachable" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "no-unsafe-negation" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js

    // "valid-typeof" is disabled due to conflicting with the TypeScript compiler:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
  },
};
