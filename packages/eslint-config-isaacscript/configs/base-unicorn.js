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
    "unicorn/consistent-destructuring": "error",
    "unicorn/consistent-function-scoping": "error",
    "unicorn/custom-error-definition": "error",
    "unicorn/empty-brace-spaces": "off", // eslint-config-prettier
    "unicorn/error-message": "error",
    "unicorn/escape-case": "error",
    "unicorn/expiring-todo-comments": "error",
    "unicorn/explicit-length-check": "error",
    "unicorn/filename-case": "error",
    "unicorn/import-style": "error",

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
    "unicorn/": "error",
    */

    "unicorn/no-nested-ternary": "error", // eslint-config-prettier

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
