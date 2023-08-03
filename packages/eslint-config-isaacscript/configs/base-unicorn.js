/**
 * This ESLint config only contains rules from `eslint-plugin-unicorn`:
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  plugins: ["unicorn"],

  rules: {
    "unicorn/better-regex": "error",
    "unicorn/catch-error-name": "error",

    /** Disabled because it has too many false positives. */
    "unicorn/consistent-destructuring": "off",

    "unicorn/consistent-function-scoping": "error",
    "unicorn/custom-error-definition": "error",
    "unicorn/empty-brace-spaces": "off", // eslint-config-prettier
    "unicorn/error-message": "error",
    "unicorn/escape-case": "error",
    "unicorn/expiring-todo-comments": "error",
    "unicorn/explicit-length-check": "error",

    /** Disabled since projects may use different file naming conventions. */
    "unicorn/filename-case": "off",

    "unicorn/import-style": "error",

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    /** Disabled because it is common to prefix variables with "new". */
    "unicorn/no-keyword-prefix": "off",

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    "unicorn/no-negated-condition": "error",

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    "unicorn/no-nested-ternary": "off", // eslint-config-prettier

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    "unicorn/no-unused-properties": "error",

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    "unicorn/number-literal-case": "off", // eslint-config-prettier

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    "unicorn/prefer-node-protocol": "error",
  },
};

module.exports = config;
