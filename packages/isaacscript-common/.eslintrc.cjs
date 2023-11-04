const path = require("node:path");

const REPO_ROOT = path.join(__dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

/** @type {import("eslint").Linter.Config} */
const config = {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "mod.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  plugins: [
    /** The `sort-exports` rule is used in some specific files. */
    "sort-exports",
  ],

  // When building and linting at the same time, the "indexLua.ts" file can cause a linting error.
  ignorePatterns: ["**/dist/**", "indexLua.ts"],

  rules: {
    /** Not defined in the parent configs. */
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        overrides: {
          constructors: "off",
        },
      },
    ],
  },

  overrides: [
    {
      files: ["./src/functions/**"],
      rules: {
        /** Not defined in the parent configs. */
        "sort-exports/sort-exports": [
          "error",
          {
            sortDir: "asc",
          },
        ],
      },
    },
  ],
};

module.exports = config;
