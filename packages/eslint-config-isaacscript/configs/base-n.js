// This ESLint config only contains rules from `eslint-plugin-n`:
// https://github.com/eslint-community/eslint-plugin-n
// (This is a forked version of `eslint-plugin-node`.)

// Rules are separated into categories:
// 1) Best Practices
// 2) Possible Errors
// 3) Stylistic Issues

/** @type {import("eslint").Linter.RulesRecord} */
const BEST_PRACTICES = {
  "n/no-deprecated-api": "error",
};

/** @type {import("eslint").Linter.RulesRecord} */
const POSSIBLE_ERRORS = {
  "n/handle-callback-err": "error",
  "n/no-callback-literal": "error",
  "n/no-exports-assign": "error",

  /** Disabled since it is handled by the TypeScript compiler. */
  "n/no-extraneous-import": "off",

  /** Disabled since require statements are not used in TypeScript code. */
  "n/no-extraneous-require": "off",

  /** Disabled because this rule is deprecated. */
  "n/no-hide-core-modules": "off",

  /** Disabled since it is handled by the TypeScript compiler. */
  "n/no-missing-import": "off",

  "n/no-missing-require": "error",
  "n/no-new-require": "error",
  "n/no-path-concat": "error",

  /**
   * Disabled because using `process.exit` is common to exit command-line applications without
   * verbose output.
   */
  "n/no-process-exit": "off",

  "n/no-unpublished-bin": "error",

  /**
   * An exception is made for files in a "scripts" directory, since those should be allowed to
   * import from "devDependencies".
   */
  "n/no-unpublished-import": "error",

  "n/no-unpublished-require": "error",

  /** Disabled because this rule is deprecated. */
  "n/no-unsupported-features": "off",

  /** Disabled because it is assumed that we are running on modern versions of Node.js. */
  "n/no-unsupported-features/es-builtins": "off",

  /**
   * Disabled because it is assumed that our transpiler or runtime has support for the latest
   * version of ESM.
   */
  "n/no-unsupported-features/es-syntax": "off",

  /** Disabled since it is handled by the TypeScript compiler. */
  "n/no-unsupported-features/node-builtins": "off",

  "n/process-exit-as-throw": "error",

  /**
   * Disabled since it does not work very well with TypeScript. (It needs project-specific
   * configuration depending on where the output directory is located.)
   */
  "n/shebang": "off",
};

/** @type {import("eslint").Linter.RulesRecord} */
const STYLISTIC_ISSUES = {
  /** Disabled since stylistic rules from this plugin are not used. */
  "n/callback-return": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/exports-style": "off",

  /**
   * This rule is helpful to automatically fix file extensions in import statements throughout an
   * entire codebase.
   */
  "n/file-extension-in-import": ["error", "always"],

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/global-require": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/no-mixed-requires": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/no-process-env": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/no-restricted-import": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/no-restricted-require": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/no-sync": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/buffer": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/console": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/process": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/text-decoder": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/text-encoder": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/url": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-global/url-search-params": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-promises/dns": "off",

  /** Disabled since stylistic rules from this plugin are not used. */
  "n/prefer-promises/fs": "off",
};

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: ["plugin:n/recommended"],

  rules: {
    ...BEST_PRACTICES,
    ...POSSIBLE_ERRORS,
    ...STYLISTIC_ISSUES,
  },

  overrides: [
    // Imports in a "scripts" directory can use "devDependencies".
    {
      files: ["**/scripts/*.{js,cjs,mjs,ts,cts,mts}"],
      rules: {
        "n/no-unpublished-import": "off",
      },
    },
  ],
};

module.exports = config;
