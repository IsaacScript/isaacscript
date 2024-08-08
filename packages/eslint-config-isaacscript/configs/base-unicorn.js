import ESLintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

/** @type {Record<string, import("@typescript-eslint/utils").TSESLint.SharedConfig.RuleEntry>} */
const NORMAL_RULES = {
  "unicorn/better-regex": "warn",
  "unicorn/catch-error-name": "warn",

  /** Disabled because it has too many false positives. */
  "unicorn/consistent-destructuring": "off",

  "unicorn/consistent-empty-array-spread": "warn",
  "unicorn/consistent-function-scoping": "warn",
  "unicorn/custom-error-definition": "warn",
  "unicorn/empty-brace-spaces": "off", // eslint-config-prettier
  "unicorn/error-message": "warn",
  "unicorn/escape-case": "warn",
  "unicorn/expiring-todo-comments": "warn",
  "unicorn/explicit-length-check": "warn",

  /** Disabled since projects may use different file naming conventions. */
  "unicorn/filename-case": "off",

  "unicorn/import-style": "warn",
  "unicorn/new-for-builtins": "warn",

  /**
   * Disabled because if a line breaks three or more ESLint rules, then it is useful to use a single
   * "eslint-disable" comment to make things more concise.
   */
  "unicorn/no-abusive-eslint-disable": "off",

  "unicorn/no-anonymous-default-export": "warn",

  /** Disabled since it is not helpful when using TypeScript. */
  "unicorn/no-array-callback-reference": "off",

  "unicorn/no-array-for-each": "warn",
  "unicorn/no-array-method-this-argument": "warn",
  "unicorn/no-array-push-push": "warn",
  "unicorn/no-array-reduce": "warn",
  "unicorn/no-await-expression-member": "warn",
  "unicorn/no-await-in-promise-methods": "warn",
  "unicorn/no-console-spaces": "warn",
  "unicorn/no-document-cookie": "warn",
  "unicorn/no-empty-file": "warn",
  "unicorn/no-for-loop": "warn",
  "unicorn/no-hex-escape": "warn",
  "unicorn/no-instanceof-array": "warn",
  "unicorn/no-invalid-fetch-options": "warn",
  "unicorn/no-invalid-remove-event-listener": "warn",

  /** Disabled because it is common to prefix variables with "new". */
  "unicorn/no-keyword-prefix": "off",

  "unicorn/no-length-as-slice-end": "warn",
  "unicorn/no-lonely-if": "warn",
  "unicorn/no-magic-array-flat-depth": "warn",
  "unicorn/no-negated-condition": "warn",
  "unicorn/no-negation-in-equality-check": "warn",
  "unicorn/no-nested-ternary": "off", // eslint-config-prettier
  "unicorn/no-new-array": "warn",
  "unicorn/no-new-buffer": "warn",
  "unicorn/no-null": "warn",
  "unicorn/no-object-as-default-parameter": "warn",

  /**
   * Disabled because using `process.exit` is common to exit command-line applications without
   * verbose output.
   */
  "unicorn/no-process-exit": "off",

  "unicorn/no-single-promise-in-promise-methods": "warn",
  "unicorn/no-static-only-class": "warn",
  "unicorn/no-thenable": "warn",

  /** Superseded by the `@typescript-eslint/no-this-alias` rule. */
  "unicorn/no-this-assignment": "off",

  "unicorn/no-typeof-undefined": "warn",
  "unicorn/no-unnecessary-await": "warn",
  "unicorn/no-unnecessary-polyfills": "warn",
  "unicorn/no-unreadable-array-destructuring": "warn",
  "unicorn/no-unreadable-iife": "warn",
  "unicorn/no-unused-properties": "warn",
  "unicorn/no-useless-fallback-in-spread": "warn",
  "unicorn/no-useless-length-check": "warn",
  "unicorn/no-useless-promise-resolve-reject": "warn",
  "unicorn/no-useless-spread": "warn",
  "unicorn/no-useless-switch-case": "warn",

  /** Disabled since it does not work properly with TypeScript. */
  "unicorn/no-useless-undefined": "off",

  "unicorn/no-zero-fractions": "warn",
  "unicorn/number-literal-case": "off", // eslint-config-prettier
  "unicorn/numeric-separators-style": "warn",
  "unicorn/prefer-add-event-listener": "warn",
  "unicorn/prefer-array-find": "warn",
  "unicorn/prefer-array-flat": "warn",
  "unicorn/prefer-array-flat-map": "warn",
  "unicorn/prefer-array-index-of": "warn",
  "unicorn/prefer-array-some": "warn",
  "unicorn/prefer-at": "warn",
  "unicorn/prefer-blob-reading-methods": "warn",
  "unicorn/prefer-code-point": "warn",
  "unicorn/prefer-date-now": "warn",
  "unicorn/prefer-default-parameters": "warn",
  "unicorn/prefer-dom-node-append": "warn",
  "unicorn/prefer-dom-node-dataset": "warn",
  "unicorn/prefer-dom-node-remove": "warn",
  "unicorn/prefer-dom-node-text-content": "warn",
  "unicorn/prefer-event-target": "warn",
  "unicorn/prefer-export-from": "warn",
  "unicorn/prefer-includes": "warn",

  /** Disabled because the rule is not compatible with TypeScript. */
  "unicorn/prefer-json-parse-buffer": "off",

  "unicorn/prefer-keyboard-event-key": "warn",
  "unicorn/prefer-logical-operator-over-ternary": "warn",
  "unicorn/prefer-math-trunc": "warn",
  "unicorn/prefer-modern-dom-apis": "warn",
  "unicorn/prefer-modern-math-apis": "warn",
  "unicorn/prefer-module": "warn",
  "unicorn/prefer-native-coercion-functions": "warn",
  "unicorn/prefer-negative-index": "warn",
  "unicorn/prefer-node-protocol": "warn",
  "unicorn/prefer-number-properties": "warn",
  "unicorn/prefer-object-from-entries": "warn",
  "unicorn/prefer-optional-catch-binding": "warn",
  "unicorn/prefer-prototype-methods": "warn",
  "unicorn/prefer-query-selector": "warn",
  "unicorn/prefer-reflect-apply": "warn",
  "unicorn/prefer-regexp-test": "warn",
  "unicorn/prefer-set-has": "warn",
  "unicorn/prefer-set-size": "warn",
  "unicorn/prefer-spread": "warn",
  "unicorn/prefer-string-raw": "warn",
  "unicorn/prefer-string-replace-all": "warn",
  "unicorn/prefer-string-slice": "warn",
  "unicorn/prefer-string-starts-ends-with": "warn",
  "unicorn/prefer-string-trim-start-end": "warn",
  "unicorn/prefer-structured-clone": "warn",
  "unicorn/prefer-switch": "warn",
  "unicorn/prefer-ternary": "warn",
  "unicorn/prefer-top-level-await": "warn",
  "unicorn/prefer-type-error": "warn",

  /** Disabled since it is common to use the variable name of "i". */
  "unicorn/prevent-abbreviations": "off",

  "unicorn/relative-url-style": "warn",
  "unicorn/require-array-join-separator": "warn",
  "unicorn/require-number-to-fixed-digits-argument": "warn",

  /** Disabled since it is not recommended by the plugin authors. */
  "unicorn/require-post-message-target-origin": "off",

  /** Disabled since string content enforcement is too project-specific. */
  "unicorn/string-content": "off",

  "unicorn/switch-case-braces": "warn",
  "unicorn/template-indent": "warn",
  "unicorn/text-encoding-identifier-case": "warn",
  "unicorn/throw-new-error": "warn",
};

/** @type {Record<string, import("@typescript-eslint/utils").TSESLint.SharedConfig.RuleEntry>} */
const DEPRECATED_RULES = {
  /** Disabled because this rule is deprecated. */
  "unicorn/import-index": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/no-array-instanceof": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/no-fn-reference-in-iterator": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/no-reduce": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/no-unsafe-regex": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-dataset": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-event-key": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-exponentiation-operator": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-flat-map": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-node-append": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-node-remove": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-object-has-own": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-replace-all": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-starts-ends-with": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-text-content": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/prefer-trim-start-end": "off",

  /** Disabled because this rule is deprecated. */
  "unicorn/regex-shorthand": "off",
};

/**
 * This ESLint config only contains rules from `eslint-plugin-unicorn`:
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 *
 * Rules are separated into categories:
 * 1) Normal rules
 * 2) Deprecated rules
 */
export const baseUnicorn = tseslint.config({
  plugins: {
    unicorn: ESLintPluginUnicorn,
  },

  rules: {
    ...NORMAL_RULES,
    ...DEPRECATED_RULES,
  },
});
