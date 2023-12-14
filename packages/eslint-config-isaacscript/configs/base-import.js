// This ESLint config only contains rules from `eslint-plugin-import`:
// https://github.com/import-js/eslint-plugin-import

// Rules are separated into categories:
// 1) Helpful warnings
// 2) Module systems
// 3) Static analysis
// 4) Style guide

/** @type {import("eslint").Linter.RulesRecord} */
const HELPFUL_WARNINGS = {
  "import/export": "error",

  /**
   * Superseded by the `deprecation/deprecation` rule. (That rule is better because it catches
   * deprecated usage that does not come from import statements specifically.)
   */
  "import/no-deprecated": "off",

  "import/no-empty-named-blocks": "error",

  /**
   * The options are [copied from
   * Airbnb](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/import.js).
   *
   * We also add a "scripts" directory entry for "devDependencies".
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

        "**/scripts/*.{js,cjs,mjs,ts,cts,mts}", // Files inside of a "scripts" directory.
      ],
      optionalDependencies: false,
    },
  ],

  "import/no-mutable-exports": "error",
  "import/no-named-as-default": "error",

  /**
   * Disabled because this is [already handled by the TypeScript
   * compiler](https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js).
   */
  "import/no-named-as-default-member": "off",

  /**
   * Disabled since this check is better performed by the [`knip`](https://github.com/webpro/knip)
   * tool.
   */
  "import/no-unused-modules": "off",
};

/** @type {import("eslint").Linter.RulesRecord} */
const MODULE_SYSTEMS = {
  "import/no-amd": "error",
  "import/no-commonjs": "error",
  "import/no-import-module-exports": "error",

  /** Disabled because it is only used in specific environments (like the browser). */
  "import/no-nodejs-modules": "off",

  /** Disabled because this is already handled by the TypeScript compiler. */
  "import/unambiguous": "off",
};

/** @type {import("eslint").Linter.RulesRecord} */
const STATIC_ANALYSIS = {
  "import/default": "error",

  /**
   * Disabled because this is [already handled by the TypeScript
   * compiler](https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js).
   */
  "import/named": "off",

  "import/namespace": "error",
  "import/no-absolute-path": "error",
  "import/no-cycle": "error",
  "import/no-dynamic-require": "error",

  /** Disabled since a prescribed import pattern is not generalizable enough across projects. */
  "import/no-internal-modules": "off",

  "import/no-relative-packages": "error",

  /**
   * Disabled since a forward import direction pattern is not generalizable enough across projects.
   */
  "import/no-relative-parent-imports": "off",

  /** Disabled since this rule should only contain a project-specific path restriction. */
  "import/no-restricted-paths": "off",

  "import/no-self-import": "error",

  /**
   * Disabled because this is [already handled by the TypeScript
   * compiler](https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js).
   */
  "import/no-unresolved": "off",

  "import/no-useless-path-segments": "error",
  "import/no-webpack-loader-syntax": "error",
};

/** @type {import("eslint").Linter.RulesRecord} */
const STYLE_GUIDE = {
  "import/consistent-type-specifier-style": "error",

  /** Disabled because it is only useful in environments that use webpack. */
  "import/dynamic-import-chunkname": "off",

  /** Disabled because this style is not generally used. */
  "import/exports-last": "off",

  /** Disabled because this is already handled by the TypeScript compiler. */
  "import/extensions": "off",

  "import/first": "error",

  /** Disabled because this style is not generally used. */
  "import/group-exports": "off",

  /** Disabled because this rule is deprecated. */
  "import/imports-first": "off",

  /** Disabled since it will trigger false positives in codebases that prefer smaller files. */
  "import/max-dependencies": "off",

  "import/newline-after-import": "error",

  /**
   * Disabled since we disallow default exports elsewhere in this config (in favor of named
   * exports).
   */
  "import/no-anonymous-default-export": "off",

  /**
   * The case against default exports is [layed out by Basarat Ali
   * Syed](https://basarat.gitbook.io/typescript/main-1/defaultisbad).
   */
  "import/no-default-export": "error",

  "import/no-duplicates": "error",
  "import/no-named-default": "error",

  /**
   * Disabled since we disallow default exports elsewhere in this config (in favor of named
   * exports).
   */
  "import/no-named-export": "off",

  /**
   * Disabled since it is too prescriptive for a general audience. (Using `import * as` is common.)
   */
  "import/no-namespace": "off",

  "import/no-unassigned-import": "error",

  /** Disabled because this is automatically handled by `prettier-plugin-organize-imports`. */
  "import/order": "off",

  /**
   * Disabled because we disallow default exports elsewhere in this config (in favor of named
   * exports).
   */
  "import/prefer-default-export": "off",
};

/*
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // Beyond just specifying the plugin, additional configuration is necessary to make the plugin
  // work properly with TypeScript. We extend the upstream TypeScript config to accomplish this:
  // https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js
  // (The necessity of this extra configuration was tested with the `import/no-cycle` rule.)
  extends: ["plugin:import/typescript"],

  plugins: ["import"],

  rules: {
    ...HELPFUL_WARNINGS,
    ...MODULE_SYSTEMS,
    ...STATIC_ANALYSIS,
    ...STYLE_GUIDE,
  },

  overrides: [
    // Disable some TypeScript-specific rules in JavaScript files.
    {
      files: ["*.js", "*.cjs", "*.mjs", "*.jsx"],
      rules: {
        "import/no-commonjs": "off",
      },
    },

    // Disable some specific rules in config files.
    {
      files: [
        ".remarkrc.mjs",
        ".remarkrc.js",
        "prettier.config.mjs",
        "prettier.config.js",
        "typedoc.config.mjs",
        "typedoc.config.js",
        "vite.config.js",
        "vite.config.mjs",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};

module.exports = config;
