import { fixupPluginRules } from "@eslint/compat";
import ESLintPluginDeprecation from "eslint-plugin-deprecation";
import tseslint from "typescript-eslint";

/**
 * This ESLint config only contains rules from `eslint-plugin-deprecation`:
 * https://github.com/gund/eslint-plugin-deprecation
 */
export const baseDeprecation = tseslint.config({
  plugins: {
    // https://github.com/gund/eslint-plugin-deprecation/issues/78
    // @ts-expect-error: The types are not matching, but it works.
    deprecation: fixupPluginRules(ESLintPluginDeprecation),
  },

  rules: {
    "deprecation/deprecation": "warn",
  },
});
