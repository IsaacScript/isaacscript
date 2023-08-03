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
    "unicorn/new-for-builtins": "error",

    /** Superseded by the `eslint-comments/no-unlimited-disable` rule. */
    "unicorn/no-abusive-eslint-disable": "off",

    "unicorn/no-array-callback-reference": "error",
    "unicorn/no-array-for-each": "error",
    "unicorn/no-array-method-this-argument": "error",
    "unicorn/no-array-push-push": "error",
    "unicorn/no-array-reduce": "error",
    "unicorn/no-await-expression-member": "error",
    "unicorn/no-console-spaces": "error",
    "unicorn/no-document-cookie": "error",
    "unicorn/no-empty-file": "error",
    "unicorn/no-for-loop": "error",
    "unicorn/no-hex-escape": "error",
    "unicorn/no-instanceof-array": "error",
    "unicorn/no-invalid-remove-event-listener": "error",

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

    "unicorn/prefer-json-parse-buffer": "error",

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    "unicorn/prefer-node-protocol": "error",

    /*
    "unicorn/": "error",
    "unicorn/": "error",
    "unicorn/": "error",
    */

    /** Disabled since it is not recommended by the plugin authors. */
    "unicorn/require-post-message-target-origin": "off",

    /** Disabled since string content enforcement is too project-specific. */
    "unicorn/string-content": "off",

    "unicorn/switch-case-braces": "error",
    "unicorn/template-indent": "error",
    "unicorn/text-encoding-identifier-case": "error",
    "unicorn/throw-new-error": "error",
  },
};

module.exports = config;
