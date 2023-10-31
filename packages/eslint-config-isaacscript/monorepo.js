const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");

/**
 * This config is meant to be used in the IsaacScript monorepo.
 *
 * @type {import("eslint").Linter.Config}
 */
const config = {
  // We need to add the `tsconfigRootDir` property, but we must also repeat the options from
  // "base-typescript-eslint.js" or they will be deleted.
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    tsconfigRootDir: REPO_ROOT,
    project: true,
  },

  ignorePatterns: ["**/dist/**"],

  rules: {
    /**
     * Documentation:
     * https://typescript-eslint.io/rules/no-restricted-imports
     *
     * Not defined in the parent configs.
     */
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            // We don't use a suffix or a prefix since some "src" folders have an "index.ts" file.
            group: ["*src*"],
            message:
              "You cannot import directly from other packages in the monorepo. Instead, import using the package name like you would in a non-monorepo project.",
          },

          {
            group: ["*/index*"],
            message:
              "You cannot import directly from a package index. Instead, import directly from the file where the code is located.",
          },
        ],
      },
    ],

    // This rule has to be told which "package.json" file that the dependencies are located in.
    "import/no-extraneous-dependencies": [
      "error",
      {
        packageDir: REPO_ROOT,
      },
    ],
  },

  overrides: [
    {
      files: ["*.test.ts"],
      rules: {
        "@typescript-eslint/no-restricted-imports": "off",
      },
    },
  ],

  settings: {
    // https://github.com/import-js/eslint-plugin-import/blob/main/README.md#importinternal-regex
    // https://github.com/import-js/eslint-plugin-import/issues/2617
    "import/internal-regex": "isaacscript-common-ts",
  },
};

module.exports = config;
