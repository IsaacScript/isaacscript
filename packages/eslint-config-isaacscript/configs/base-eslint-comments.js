// This ESLint config only contains rules from `eslint-plugin-eslint-comments`:
// https://github.com/mysticatea/eslint-plugin-eslint-comments

// Rules are separated into categories:
// 1) Best Practices
// 2) Stylistic Issues

/** @type {import("eslint").Linter.RulesRecord} */
const BEST_PRACTICES = {
  /**
   * The `allowWholeFile` option is enabled because it is common practice to use "eslint-disable"
   * comments for a whole file.
   */
  "eslint-comments/disable-enable-pair": [
    "error",
    {
      allowWholeFile: true,
    },
  ],

  "eslint-comments/no-aggregating-enable": "error",
  "eslint-comments/no-duplicate-disable": "error",

  /**
   * Disabled because if a line breaks three or more ESLint rules, then it is useful to use a single
   * "eslint-disable" comment to make things more concise.
   */
  "eslint-comments/no-unlimited-disable": "off",

  "eslint-comments/no-unused-disable": "error",
  "eslint-comments/no-unused-enable": "error",
};

/** @type {import("eslint").Linter.RulesRecord} */
const STYLISTIC_ISSUES = {
  /**
   * Disabled because it is only useful in projects that want to prevent disabling specific ESLint
   * rules.
   */
  "eslint-comments/no-restricted-disable": "off",

  /** Disabled because we want to allow disabling ESLint rules where appropriate. */
  "eslint-comments/no-use": "off",

  /** Disabled because requiring descriptions for every ESLint disable would be too cumbersome. */
  "eslint-comments/require-description": "off",
};

/** @type {import("eslint").Linter.Config} */
const config = {
  plugins: ["eslint-comments"],

  rules: {
    ...BEST_PRACTICES,
    ...STYLISTIC_ISSUES,
  },
};

module.exports = config;
