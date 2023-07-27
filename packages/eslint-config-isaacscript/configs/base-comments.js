/**
 * This ESLint config only contains rules from `eslint-plugin-eslint-comments`:
 * https://github.com/mysticatea/eslint-plugin-eslint-comments
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // Instead of using the recommended config, we specifically turn on every rule that is useful.
  plugins: ["eslint-comments"],

  // https://github.com/mysticatea/eslint-plugin-eslint-comments/tree/master/docs/rules
  // - Rules are separated into categories:
  //   - Best Practices
  //   - Stylistic Issues
  // - An `[X]` indicates that the rule is not explicitly not enabled for a particular reason.
  rules: {
    // --------------
    // Best Practices
    // --------------

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/disable-enable-pair.md
     *
     * Ensure that an "eslint-enable" comment has a corresponding "eslint-disable" comment.
     */
    "eslint-comments/disable-enable-pair": [
      "error",
      {
        // By default, the rule does not allow "eslint-disable" comments for a whole file, which is
        // standard practice.
        allowWholeFile: true,
      },
    ],

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-aggregating-enable.md
     *
     * Prevent "eslint-enable" comments that enable more than one rule.
     */
    "eslint-comments/no-aggregating-enable": "error",

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-duplicate-disable.md
     *
     * Prevent duplicate "eslint-disable" comments.
     */
    "eslint-comments/no-duplicate-disable": "error",

    // [X] "eslint-comments/no-unlimited-disable" is not enabled because if a line breaks two or
    // more ESLint rules, then it is useful to use a single "eslint-disable" comment.

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-unused-disable.md
     *
     * This can help clean up unnecessary comments.
     */
    "eslint-comments/no-unused-disable": "error",

    /**
     * Documentation:
     * https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/docs/rules/no-unused-enable.md
     *
     * This can help clean up unnecessary comments.
     */
    "eslint-comments/no-unused-enable": "error",

    // ----------------
    // Stylistic Issues
    // ----------------

    // [X] "eslint-comments/no-restricted-disable" is not enabled because it is only useful in
    // projects that want to prevent disabling specific ESLint rules.

    // [X] "eslint-comments/no-use" is not enabled because we want to allow disabling ESLint rules
    // where appropriate.

    // [X] "eslint-comments/require-description" is not enabled because requiring descriptions for
    // every ESLint disable would be too cumbersome, especially for a configuration like this that
    // enables quite a lot of ESLint rules.
  },
};

module.exports = config;
