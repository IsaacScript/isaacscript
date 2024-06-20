import tseslint from "typescript-eslint";

/**
 * This ESLint config only contains rules from `eslint-plugin-deprecation`:
 * https://github.com/gund/eslint-plugin-deprecation
 *
 * TODO: This plugin does not yet support flat configs.
 *
 * @see https://github.com/gund/eslint-plugin-deprecation/pulls
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/8988
 */
export const baseDeprecation = tseslint.config({
  /*
  plugins: {
    deprecation: ESLintPluginDeprecation,
  },

  rules: {
    "deprecation/deprecation": "error",
  },
  */
});
