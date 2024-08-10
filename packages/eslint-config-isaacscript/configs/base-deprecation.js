import ESLintPluginDeprecation from "eslint-plugin-deprecation";
import tseslint from "typescript-eslint";

/**
 * This ESLint config only contains rules from `eslint-plugin-deprecation`:
 * https://github.com/gund/eslint-plugin-deprecation
 */
export const baseDeprecation = tseslint.config({
  plugins: {
    deprecation: ESLintPluginDeprecation,
  },

  rules: {
    "deprecation/deprecation": "warn",
  },
});
