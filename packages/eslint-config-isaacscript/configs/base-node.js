/**
 * This ESLint config only contains rules from `eslint-plugin-n`:
 * https://github.com/eslint-community/eslint-plugin-n
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: ["plugin:n/recommended"],

  // https://github.com/eslint-community/eslint-plugin-n#-rules
  // - Rules are separated into categories:
  //   - Best Practices
  //   - Possible Errors
  //   - Stylistic Issues
  // - An `[X]` indicates that the rule is not explicitly not enabled for a particular reason.
  rules: {
    // --------------
    // Best Practices
    // --------------

    // [I] "no-deprecated-api" is included in `recommended`.

    // ---------------
    // Possible Errors
    // ---------------

    // Not defined in the recommended config.
    "n/handle-callback-err": "error",

    // Not defined in the recommended config.
    "n/no-callback-literal": "error",

    // [I] "n/no-exports-assign" is included in `recommended`.

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

    // [X] "n/no-hide-core-modules" is not enabled since it is deprecated.

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

    // [I] "n/no-missing-require" is included in `recommended`.

    // Not defined in the recommended config.
    "n/no-new-require": "error",

    // Not defined in the recommended config.
    "n/no-path-concat": "error",

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

    // [I] "n/no-unpublished-bin" is included in `recommended`.

    // [I] "n/no-unpublished-import" is included in `recommended`.

    // [I] "n/no-unpublished-require" is included in `recommended`.

    // [X] "n/no-unsupported-features" is not enabled since it is deprecated.

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
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unsupported-features/node-builtins.md
     *
     * Defined at:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/lib/configs/_commons.js
     *
     * The TypeScript compiler will prevent us from using Node modules that are not present in the
     * corresponding specified Node output environment, so this rule is unnecessary.
     */
    "n/no-unsupported-features/node-builtins": "off",

    // [I] "n/process-exit-as-throw" is included in `recommended`.

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
      "error",
      {
        convertPath: {
          "src/**/*.ts": ["^src/(.+?)\\.ts$", "dist/$1.js"],
        },
      },
    ],

    // ----------------
    // Stylistic Issues
    // ----------------

    // Note that not every rule in this section is explicitly listed. There are no stylistic rules
    // contained in the recommended config.

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-node/blob/master/docs/rules/file-extension-in-import.md
     *
     * Not defined in the parent configs.
     *
     * We use this to automatically fix import statements to ESM.
     */
    "n/file-extension-in-import": ["error", "always"],
  },
};

module.exports = config;
