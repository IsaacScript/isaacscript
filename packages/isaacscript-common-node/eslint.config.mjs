import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, "..", "..");
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
