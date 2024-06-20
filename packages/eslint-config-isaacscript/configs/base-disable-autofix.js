// @ts-expect-error https://github.com/chiefmikey/eslint-plugin-disable-autofix/issues/53
import ESLintPluginDisableAutofix from "eslint-plugin-disable-autofix";
import tseslint from "typescript-eslint";

/**
 * This ESLint config only contains rules from `eslint-plugin-disable-autofix`:
 * https://github.com/chiefmikey/eslint-plugin-disable-autofix
 *
 * This allows the fixer for specific core ESLint rules to be turned off.
 */
export const baseDisableAutofix = tseslint.config({
  plugins: {
    "disable-autofix": ESLintPluginDisableAutofix,
  },

  rules: {
    /**
     * It is common during development to comment out code after an [early
     * return](https://medium.com/swlh/return-early-pattern-3d18a41bba8). In these cases, the
     * auto-fixer is harmful, since it would require us to manually go put the return statement back
     * after uncommenting the code.
     */
    "disable-autofix/no-useless-return": "error",

    /**
     * It is common during development to comment out code that modifies a `let` variable. In these
     * cases, the auto-fixer is harmful, since it would require us to manually go change the `const`
     * back to a `let` after uncommenting the code.
     */
    "disable-autofix/prefer-const": "error",
  },
});
