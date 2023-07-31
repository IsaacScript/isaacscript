const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
  "configs",
);

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  ignorePatterns: ["**/file-templates/**"],

  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },

  rules: {
    /**
     * Documentation:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/docs/rules/no-invalid-default-map.md
     *
     * Defined at:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-plugin-isaacscript/src/configs/recommended.ts
     *
     * Enums that are used with the API must be numbers since that is what the API expects. We also
     * prefer that unofficial enums are also number enums for consistency.
     */
    "isaacscript/no-number-enums": "off",

    /**
     * Documentation:
     * https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/shebang.md
     *
     * Defined at:
     * https://github.com/IsaacScript/isaacscript/blob/main/packages/eslint-config-isaacscript/base.js
     *
     * This package uses a non-standard output folder, so we have to customize this rule.
     */
    "n/shebang": [
      "error",
      {
        convertPath: {
          "src/**/*.ts": ["^src/(.+?)\\.ts$", "src/$1.js"],
        },
      },
    ],
  },

  overrides: [
    {
      files: ["./src/plugins/*.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};

module.exports = config;
