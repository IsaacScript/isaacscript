import tseslint from "typescript-eslint";
import { base } from "../eslint-config-isaacscript/base.js";
import { monorepo } from "../eslint-config-isaacscript/monorepo.js";
// @ts-expect-error https://github.com/jrdrg/eslint-plugin-sort-exports/issues/44
import ESLintPluginSortExports from "eslint-plugin-sort-exports";

export default tseslint.config(
  ...base,
  ...monorepo,

  {
    plugins: {
      /** The `sort-exports` rule is used in some specific files. */
      "sort-exports": ESLintPluginSortExports,
    },
  },

  {
    files: ["src/functions/**"],
    rules: {
      /** Not defined in the parent configs. */
      "sort-exports/sort-exports": [
        "warn",
        {
          sortDir: "asc",
        },
      ],
    },
  },
);
