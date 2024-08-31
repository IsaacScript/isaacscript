import ESLintPluginStylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

/**
 * This ESLint config only contains rules from `@stylistic/eslint-plugin`:
 * https://eslint.style/
 */
export const baseStylistic = tseslint.config({
  plugins: {
    // @ts-expect-error https://github.com/eslint-stylistic/eslint-stylistic/issues/506
    "@stylistic": ESLintPluginStylistic,
  },

  rules: {
    /** This rule is not handled by Prettier, so we must use ESLint to enforce it. */
    "@stylistic/lines-around-comment": [
      "warn",
      {
        // From the JavaScript version of the rule:
        // https://eslint.style/rules/js/lines-around-comment#options
        allowBlockStart: true,
        allowObjectStart: true,
        allowArrayStart: true,
        allowClassStart: true,

        // From the TypeScript version of the rule:
        // https://eslint.style/rules/ts/lines-around-comment#options
        allowEnumStart: true,
        allowInterfaceStart: true,
        allowModuleStart: true,
        allowTypeStart: true,
      },
    ],

    /** This rule is not handled by Prettier, so we must use ESLint to enforce it. */
    "@stylistic/lines-between-class-members": [
      "warn",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],

    /**
     * We forbid unnecessary backticks by using the options specified in [the
     * `eslint-config-prettier`
     * documentation](https://github.com/prettier/eslint-config-prettier#enforce-backticks).
     */
    "@stylistic/quotes": [
      "warn",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: false,
      },
    ],
  },
});