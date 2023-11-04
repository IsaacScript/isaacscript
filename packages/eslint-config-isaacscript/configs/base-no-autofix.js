/**
 * This ESLint config only contains rules from `eslint-plugin-no-autofix`:
 * https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix
 *
 * This allows the fixer for specific core ESLint rules to be turned off.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  plugins: ["no-autofix"],

  rules: {
    /**
     * It is common during development to comment out code after an [early
     * return](https://medium.com/swlh/return-early-pattern-3d18a41bba8). In these cases, the
     * auto-fixer is harmful, since it would require us to manually go put the return statement back
     * after uncommenting the code.
     */
    "no-autofix/no-useless-return": "error",

    /**
     * It is common during development to comment out code that modifies a `let` variable. In these
     * cases, the auto-fixer is harmful, since it would require us to manually go change the `const`
     * back to a `let` after uncommenting the code.
     */
    "no-autofix/prefer-const": "error",
  },
};

module.exports = config;
