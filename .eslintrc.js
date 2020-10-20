// This is the configuration file for ESLint, the TypeScript linter
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    // The linter base is the Airbnb style guide,
    // which is the most popular JavaScript style guide in the world:
    // https://github.com/airbnb/javascript
    // The actual ESLint config is located here:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules
    // The TypeScript config extends it:
    // https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
    "airbnb-typescript/base",

    // We extend the Airbnb rules with the "recommended" and "recommended-requiring-type-checking"
    // rules from the "typescript-eslint" plugin, which is also recommended by Matt Turnbull,
    // the author of "airbnb-typescript/base"
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/README.md#recommended
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.ts
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    // We use Prettier to automatically format TypeScript files
    // Disable any rules that conflict with Prettier
    // https://github.com/prettier/eslint-config-prettier
    "prettier",
    "prettier/@typescript-eslint",
  ],

  parserOptions: {
    // ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
    // things to lint correctly
    // We do not point this at "./tsconfig.json" because certain files (such at this file) should be
    // linted but not included in the actual project output
    project: "./tsconfig.eslint.json",
  },

  // We modify the linting rules from the base for some specific things
  // (listed in alphabetical order)
  rules: {
    // Documentation:
    // https://eslint.org/docs/rules/lines-between-class-members
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
    // Airbnb has "exceptAfterSingleLine" turned off by default
    // A list of single-line variable declarations at the top of a class is common in TypeScript
    "@typescript-eslint/lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],

    // Documentation:
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    // https://eslint.org/docs/rules/no-use-before-define
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/variables.js#L42
    // This allows code to be structured in a more logical order
    "@typescript-eslint/no-use-before-define": ["off"],

    // Documentation:
    // https://eslint.org/docs/rules/no-console
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/errors.js
    // As a command-line program, it is normal to write to standard out and standard error
    "no-console": "off",

    // Documentation:
    // https://eslint.org/docs/rules/no-restricted-syntax
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js
    // "for..of" loops are necessary to write efficient code in some situations
    "no-restricted-syntax": "off",

    // Documentation:
    // https://eslint.org/docs/rules/prefer-destructuring
    // Defined at:
    // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/es6.js
    // Array destructuring can result in non-intuitive code
    // Object destructuring is disgustingly verbose in TypeScript
    // e.g. "const foo: string = bar.foo;" vs "const { foo }: { foo: string } = bar;"
    "prefer-destructuring": ["off"],
  },
};
