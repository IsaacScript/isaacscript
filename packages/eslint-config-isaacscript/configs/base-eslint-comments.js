// @ts-expect-error https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/214
import ESLintPluginESLintCommentsConfigs from "@eslint-community/eslint-plugin-eslint-comments/configs";
import tseslint from "typescript-eslint";

// The plugin is not currently exported from the root, so we have to get the plugin from the config.
// https://github.com/eslint-community/eslint-plugin-eslint-comments/issues/215
const ESLintPluginESLintComments =
  ESLintPluginESLintCommentsConfigs.recommended.plugins[
    "@eslint-community/eslint-comments"
  ];

/** @type {Record<string, import("@typescript-eslint/utils").TSESLint.SharedConfig.RuleEntry>} */
const BEST_PRACTICES = {
  /**
   * The `allowWholeFile` option is enabled because it is common practice to use "eslint-disable"
   * comments for a whole file.
   */
  "@eslint-community/eslint-comments/disable-enable-pair": [
    "error",
    {
      allowWholeFile: true,
    },
  ],

  "@eslint-community/eslint-comments/no-aggregating-enable": "error",
  "@eslint-community/eslint-comments/no-duplicate-disable": "error",

  /**
   * Disabled because if a line breaks three or more ESLint rules, then it is useful to use a single
   * "eslint-disable" comment to make things more concise.
   */
  "@eslint-community/eslint-comments/no-unlimited-disable": "off",

  "@eslint-community/eslint-comments/no-unused-disable": "error",
  "@eslint-community/eslint-comments/no-unused-enable": "error",
};

/** @type {Record<string, import("@typescript-eslint/utils").TSESLint.SharedConfig.RuleEntry>} */
const STYLISTIC_ISSUES = {
  /**
   * Disabled because it is only useful in projects that want to prevent disabling specific ESLint
   * rules.
   */
  "@eslint-community/eslint-comments/no-restricted-disable": "off",

  /** Disabled because we want to allow disabling ESLint rules where appropriate. */
  "@eslint-community/eslint-comments/no-use": "off",

  /** Disabled because requiring descriptions for every ESLint disable would be too cumbersome. */
  "@eslint-community/eslint-comments/require-description": "off",
};

/**
 * This ESLint config only contains rules from `eslint-plugin-eslint-comments`:
 * https://github.com/mysticatea/eslint-plugin-eslint-comments
 *
 * Rules are separated into categories:
 * 1) Best Practices
 * 2) Stylistic Issues
 */
export const baseESLintComments = tseslint.config({
  plugins: {
    "@eslint-community/eslint-comments": ESLintPluginESLintComments,
  },

  rules: {
    ...BEST_PRACTICES,
    ...STYLISTIC_ISSUES,
  },
});
