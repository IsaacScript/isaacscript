// This is the configuration file for ESLint, the TypeScript linter:
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: [
    /**
     * The linter base is the shared IsaacScript config:
     * https://github.com/IsaacScript/eslint-config-isaacscript/blob/main/mod.js
     */
    "eslint-config-isaacscript/mod",
  ],

  // Don't bother linting the compiled output.
  ignorePatterns: ["./dist/**"],

  parserOptions: {
    /**
     * ESLint needs to know about the project's TypeScript settings in order for TypeScript-specific
     * things to lint correctly. We do not point this at "./tsconfig.json" because certain files
     * (such at this file) should be linted but not included in the actual project output.
     */
    project: "./tsconfig.eslint.json",
  },

  rules: {
    /**
     * Documentation:
     * https://github.com/jrdrg/eslint-plugin-sort-exports
     * Not defined in parent configs.
     */
    "sort-exports/sort-exports": [
      "error",
      {
        sortDir: "asc",
      },
    ],
  },

  overrides: [
    {
      files: ["./src/callbacks/subscriptions/**"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
    {
      files: ["./src/features/*.ts"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
    {
      files: ["./src/maps/*.ts"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
    {
      files: ["./src/objects/*.ts"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
    {
      files: ["./src/sets/*.ts"],
      rules: {
        "sort-exports/sort-exports": "off",
      },
    },
  ],
};
