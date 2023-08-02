/**
 * This ESLint config only contains rules from `eslint-plugin-no-autofix`:
 * https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // Activate the "no-autofix" plugin, which allows the fixer for specific core ESLint rules to be
  // turned off:
  // https://github.com/aladdin-add/eslint-plugin/tree/master/packages/no-autofix
  plugins: ["no-autofix"],

  rules: {
    "no-autofix/no-useless-return": "error",
    "no-autofix/prefer-const": "error",
  },
};

module.exports = config;
