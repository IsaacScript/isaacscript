// This is a shared configuration file for ESLint:
// https://eslint.org/docs/latest/user-guide/configuring
// This config is meant to be used as a base for all TypeScript projects.
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

    /**
     * Lint Node-specific things:
     * https://github.com/eslint-community/eslint-plugin-n
     */
    "plugin:n/recommended",

    /**
     * Disable any ESLint rules that conflict with Prettier:
     * https://github.com/prettier/eslint-config-prettier
     * (Otherwise, we will have unfixable ESLint errors.)
     */
    "prettier",

    /** Rule modifications are split out into different files for better organization. */
    "./base-eslint",
    "./base-typescript-eslint",
    "./base-jsdoc",
  ],

  plugins: [
    /** Activate the "deprecation" plugin, which helps to find deprecated code. */
    "deprecation",

    /**
     * Activate the "no-autofix" plugin, which allows the fixer for specific rules to be turned off:
     * https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix
     */
    "no-autofix",

    /**
     * Activate the "no-type-assertion" plugin, which allows the "no-type-assertion" rule to be
     * optionally enabled on a per-project basis:
     * https://github.com/Dremora/eslint-plugin-no-type-assertion
     */
    "no-type-assertion",

    /**
     * Activate the "eslint-plugin-only-warn" plugin to change all errors to warnings:
     * https://github.com/bfanger/eslint-plugin-only-warn
     *
     * This allows the end-user to more easily distinguish between errors from the TypeScript
     * compiler (which show up in red) and ESLint rule violations (which show up in yellow).
     */
    "only-warn",

    /**
     * Activate the "sort-exports" plugin, which allows the "sort-exports" rule to be optionally
     * enabled on a per-project basis:
     * https://github.com/jrdrg/eslint-plugin-sort-exports
     */
    "sort-exports",

    /**
     * Activate the "unicorn" plugin, which allows for various miscellaneous useful rules:
     * https://github.com/sindresorhus/eslint-plugin-unicorn
     */
    "unicorn",
  ],

  rules: {
    /**
     * Documentation:
     * https://github.com/gund/eslint-plugin-deprecation
     *
     * Not defined in parent configs.
     *
     * Warn on deprecated code.
     */
    "deprecation/deprecation": "warn",

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
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     *
     * This rule is useful in commonjs codebases that want to ban file extensions on imports.
     * However, ESM is now the standard and file extensions should be used. Furthermore, in
     * TypeScript codebases, the compiler will alert us to any errors on a file extension in an
     * import statement.
     */
    "import/extensions": "off",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
     *
     * Not defined in the parent configs.
     *
     * The case against default exports is layed out here:
     * https://basarat.gitbook.io/typescript/main-1/defaultisbad
     */
    "import/no-default-export": "warn",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     *
     * This rule is not necessary in TypeScript codebases, since the compiler would error if you had
     * a typo in an import statement.
     */
    "import/no-unresolved": "off",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
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
     * https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
     *
     * Not defined in parent configs.
     *
     * We use this to automatically fix import statements to ESM.
     */
    "n/file-extension-in-import": ["warn", "always"],

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-import.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * The TypeScript compiler will warn us if an import does not exist, so this rule is
     * unnecessary.
     */
    "n/no-extraneous-import": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-require.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * Require statements are not used in TypeScript code.
     */
    "n/no-extraneous-require": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * The TypeScript compiler will warn us if an import does not exist, so this rule is
     * unnecessary.
     */
    "n/no-missing-import": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-exit.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * Using "process.exit" allows the ability to exit command-line applications without verbose
     * output.
     */
    "n/no-process-exit": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-syntax.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * This rule requires adding `parserOptions.ecmaVersion` to every ESLint configuration file. The
     * rule does not provide enough value to make that modification worth it.
     */
    "n/no-unsupported-features/es-syntax": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/es-syntax.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * This rule requires adding `parserOptions.ecmaVersion` to every ESLint configuration file. The
     * rule does not provide enough value to make that modification worth it.
     */
    "n/no-unsupported-features/es-builtins": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/node-builtins.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * The TypeScript compiler will prevent us from using Node modules that are not present in the
     * corresponding specified Node output environment, so this rule is unnecessary.
     */
    "n/no-unsupported-features/node-builtins": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/shebang.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * We need to configure this rule to be Typescript-aware.
     */
    "n/shebang": [
      "warn",
      {
        convertPath: {
          "src/**/*.ts": ["^src/(.+?)\\.ts$", "dist/$1.js"],
        },
      },
    ],

    /**
     * Documentation:
     * https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix
     *
     * We want to disable the autofix for this rule, since it is almost always unwanted.
     */
    "no-useless-return": "off",
    "no-autofix/no-useless-return": "warn",

    /**
     * Documentation:
     * https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix
     *
     * We want to disable the autofix for this rule, since it is almost always unwanted.
     */
    "prefer-const": "off",
    "no-autofix/prefer-const": "warn",

    /**
     * Documentation:
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
     *
     * Not defined in parent configs.
     *
     * Enforce the new "node:" prefix as an extra safety measure.
     */
    "unicorn/prefer-node-protocol": "warn",

    /**
     * Documentation:
     * https://eslint.org/docs/latest/rules/no-restricted-syntax
     *
     * Not defined in parent configs.
     *
     * Prevent superfluous type annotations, which can cause bugs with widened types.
     */
    // https://github.com/typescript-eslint/typescript-eslint/issues/6446
    "no-restricted-syntax": [
      "warn",
      {
        selector:
          'VariableDeclarator[id.typeAnnotation] > :matches(TSTypeAssertion, TSAsExpression) > TSTypeReference.typeAnnotation > Identifier[name="const"]',
        message:
          "Don't use `as const` with a type annotated variable, since it widens the type.",
      },
    ],
  },

  overrides: [
    // Disable some TypeScript-specific rules in JavaScript files.
    {
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        "isaacscript/no-object-any": "off",
        "isaacscript/require-capital-const-assertions": "off",
        "isaacscript/require-capital-read-only": "off",
      },
    },

    // Remark configs require a default export.
    {
      files: [".remarkrc.mjs"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
