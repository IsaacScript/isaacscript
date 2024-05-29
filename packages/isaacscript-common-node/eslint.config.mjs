import path from "node:path";

const REPO_ROOT = path.join(import.meta.dirname, "..", "..");
const ESLINT_CONFIG_ISAACSCRIPT_PATH = path.join(
  REPO_ROOT,
  "packages",
  "eslint-config-isaacscript",
);

export default {
  extends: [
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "base.js"),
    path.join(ESLINT_CONFIG_ISAACSCRIPT_PATH, "monorepo.js"),
  ],

  plugins: [
    /** The `sort-exports` rule is used in some specific files. */
    "sort-exports",
  ],

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
