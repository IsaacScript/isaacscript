/**
 * This ESLint config only contains rules from `eslint-plugin-import`:
 * https://github.com/import-js/eslint-plugin-import
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  extends: ["plugin:import/recommended"],

  // https://github.com/import-js/eslint-plugin-import#rules
  // - Rules are separated into categories:
  //   - Helpful warnings
  //   - Module systems
  //   - Static analysis
  //   - Style guide
  // - An `[X]` indicates that the rule is not explicitly not enabled for a particular reason.
  rules: {
    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
     *
     * This rule is useful in CommonJS codebases that want to ban file extensions on imports.
     * However, ESM is now the standard and file extensions should be used. Furthermore, in
     * TypeScript codebases, the compiler will alert us to any errors on a file extension in an
     * import statement.
     */
    "import/extensions": "off",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
     *
     * Not defined in the parent configs.
     *
     * The case against default exports is layed out here:
     * https://basarat.gitbook.io/typescript/main-1/defaultisbad
     */
    "import/no-default-export": "error",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     *
     * This rule is not necessary in TypeScript codebases, since the compiler would error if you had
     * a typo in an import statement.
     */
    "import/no-unresolved": "off",

    /**
     * Documentation:
     * https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/prefer-default-export.md
     *
     * Defined at:
     * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js
     *
     * The case against default exports is layed out here:
     * https://basarat.gitbook.io/typescript/main-1/defaultisbad
     */
    "import/prefer-default-export": "off",
  },
};

module.exports = config;
