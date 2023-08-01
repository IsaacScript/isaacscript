/**
 * This ESLint config only contains rules from `eslint-plugin-import`:
 * https://github.com/import-js/eslint-plugin-import
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: ["plugin:import/recommended"],

  // https://github.com/import-js/eslint-plugin-import#rules
  // - Rules are separated into categories:
  //   - Helpful warnings
  //   - Module systems
  //   - Static analysis
  //   - Style guide
  // - An `[I]` indicates that the rule is inherited from the parent configs.
  // - An `[X]` indicates that the rule is not explicitly not enabled for a particular reason.
  rules: {
    // ----------------
    // Helpful warnings
    // ----------------

    // [I] "import/export" is included in `recommended`.

    // [X] "import/no-deprecated" is not enabled since it is superseded by the
    // `deprecation/deprecation` rule. (The latter will catch deprecated function usage that do not
    // come from import statements specifically.)

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-empty-named-blocks": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (We copy the options from
     * Airbnb.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "test/**", // tape, common npm pattern
          "tests/**", // also common npm pattern
          "spec/**", // mocha, rspec-like pattern
          "**/__tests__/**", // jest pattern
          "**/__mocks__/**", // jest pattern
          "test.{js,jsx}", // repos with a single test file
          "test-*.{js,jsx}", // repos with multiple top-level test files
          "**/*{.,_}{test,spec}.{js,jsx}", // tests where the extension or filename suffix denotes that it is a test
          "**/jest.config.js", // jest config
          "**/jest.setup.js", // jest setup
          "**/vue.config.js", // vue-cli config
          "**/webpack.config.js", // webpack config
          "**/webpack.config.*.js", // webpack config
          "**/rollup.config.js", // rollup config
          "**/rollup.config.*.js", // rollup config
          "**/gulpfile.js", // gulp config
          "**/gulpfile.*.js", // gulp config
          "**/Gruntfile{,.js}", // grunt config
          "**/protractor.conf.js", // protractor config
          "**/protractor.conf.*.js", // protractor config
          "**/karma.conf.js", // karma config
          "**/.eslintrc.js", // eslint config
        ],
        optionalDependencies: false,
      },
    ],

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-mutable-exports": "error",

    // [I] "import/no-named-as-default" is included in `recommended`.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md
     *
     * Defined at:
     * https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
     *
     * This is already handled by the TypeScript compiler:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     */
    "import/no-named-as-default-member": "off",

    // [X] "import/no-unused-modules" is not enabled since this check is mostly covered by the
    // `ts-prune` tool.

    // --------------
    // Module systems
    // --------------

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-amd.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-amd": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-commonjs.md
     *
     * Not defined in the parent configs.
     *
     * We want to disallow CommonJS in favor of ESM.
     */
    "import/no-commonjs": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-import-module-exports.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-import-module-exports": "error",

    // [X] "import/no-nodejs-modules" is not enabled because it is only used in specific
    // environments (like the browser).

    // [X] "import/unambiguous" is not enabled because it is unnecessary when using TypeScript.

    // ---------------
    // Static analysis
    // ---------------

    // [I] "import/default" is included in `recommended`.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
     *
     * Defined at:
     * https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
     *
     * This is already handled by the TypeScript compiler:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     */
    "import/named": "off",

    // [I] "import/namespace" is included in `recommended`.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb uses the default
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-absolute-path": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb uses the default
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-cycle": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-dynamic-require.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-dynamic-require": "error",

    // [X] "import/no-internal-modules" is not enabled since a prescribed import pattern is not
    // generalizable enough across projects.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-relative-packages.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-relative-packages": "error",

    // [X] "import/no-relative-parent-imports" is not enabled since a forward import direction
    // pattern is not generalizable enough across projects.

    // [X] "import/no-restricted-paths" is not enabled since it should only contain a
    // project-specific path restriction.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-self-import": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
     *
     * Defined at:
     * https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
     *
     * This is already handled by the TypeScript compiler:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     *
     * Additionally, see:
     * https://github.com/iamturns/eslint-config-airbnb-typescript/tree/master#why-is-importno-unresolved-disabled
     */
    "import/no-unresolved": "off",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (We do not need to specify the
     * `commonjs` option, since TypeScript uses ESM.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-useless-path-segments": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-webpack-loader-syntax.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-webpack-loader-syntax": "error",

    // -----------
    // Style guide
    // -----------

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb uses the default
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/consistent-type-specifier-style": "error",

    // [X] "import/dynamic-import-chunkname" is not enabled because it is only useful in
    // environments that use webpack.

    // [X] "import/exports-last" is not enabled because this style is not generally used.

    // [X] "import/extensions" is not enabled because because in TypeScript codebases, the compiler
    // will alert us to any errors on a file extension in an import statement.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/first": "error",

    // [X] "import/group-exports" is not enabled because this style is not generally used.

    // [X] "import/imports-first" is not enabled since it is deprecated.

    // [X] "import/max-dependencies" is not enabled since it will trigger false positives in
    // codebases that prefer smaller files.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (Airbnb uses the default
     * options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/newline-after-import": "error",

    // [X] "import/no-anonymous-default-export" is not enabled since we disallow default exports
    // elsewhere in this config (in favor of named exports).

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
     *
     * Not defined in the parent configs.
     *
     * The case against default exports is layed out here:
     * https://basarat.gitbook.io/typescript/main-1/defaultisbad
     *
     * There are no options.
     */
    "import/no-default-export": "error",

    // [I] "import/no-duplicates" is included in `recommended`.

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md
     *
     * Not defined in the parent configs.
     *
     * We follow Airbnb's lead and enable this as a best practice. (There are no options.)
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     */
    "import/no-named-default": "error",

    // [X] "import/no-named-export" is not enabled since we disallow default exports elsewhere in
    // this config (in favor of named exports).

    // [X] "import/no-namespace" is not enabled since it is too prescriptive for a general audience.
    // (Using `import * as` is common.)

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-default.md
     *
     * Not defined in the parent configs.
     *
     * We want to disallow importing for side effects.
     */
    "import/no-unassigned-import": "error",

    // [X] "import/order" is not enabled because it is automatically handled by
    // `prettier-plugin-organize-imports`.

    // [X] "import/prefer-default-export" is not enabled because we enable
    // "import/no-default-export".
  },

  overrides: [
    {
      // Disable some TypeScript-specific rules in JavaScript files.
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        "import/no-commonjs": "off",
      },
    },
  ],
};

module.exports = config;
