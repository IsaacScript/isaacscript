/**
 * This ESLint config only contains rules from `eslint-plugin-unicorn`:
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  plugins: ["unicorn"],

  rules: {
    /**
     * Documentation:
     * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
     *
     * Not defined in the parent configs.
     *
     * Enforce the new "node:" prefix as an extra safety measure.
     */
    "unicorn/prefer-node-protocol": "error",
  },
};

module.exports = config;
