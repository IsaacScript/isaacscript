import path from "node:path";

const REPO_ROOT = path.join(import.meta.dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

export default {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "mod.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  plugins: [
    /** The `sort-exports` rule is used in some specific files. */
    "sort-exports",
  ],

  ignorePatterns: [
    "**/dist/**",
    // When building and linting at the same time, the "indexLua.ts" file can cause a linting error.
    "indexLua.ts",
    // Ignore files that were transpiled from Lua to JavaScript.
    "jsonLua.js",
  ],

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

    /**
     * Defined at: mod.js
     *
     * Since we transpile this library to both Lua and JavaScript, we need to re-enable this lint
     * rule.
     */
    "@typescript-eslint/require-array-sort-compare": "error",
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
