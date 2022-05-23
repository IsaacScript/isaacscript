module.exports = {
  extends: [
    "../eslint-config-isaacscript/monorepo.js",
    "../eslint-config-isaacscript/base.js",
  ],

  /**
   * Don't bother linting the template files (for inserting into a new IsaacScript project) or the
   * compiled output.
   */
  ignorePatterns: ["./file-templates/**"],

  parserOptions: {
    /**
     * ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
     * things to lint correctly. We do not point this at "./tsconfig.json" because certain files
     * (such at this file) should be linted but not included in the actual project output.
     */
    // project: "./tsconfig.eslint.json",
  },

  rules: {},
};
