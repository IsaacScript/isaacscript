// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";
import { base } from "../eslint-config-isaacscript/base.js";
import { monorepo } from "../eslint-config-isaacscript/monorepo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, "..", "..");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  ...base,
  ...monorepo,
  ...compat.extends("plugin:@docusaurus/recommended"),

  {
    rules: {
      "import-x/no-default-export": "off", // React uses default exports.
      "n/file-extension-in-import": "off", // Docusaurus does not yet use ESM.
      "no-alert": "off",

      // This rule has to be told which "package.json" file that the dependencies are located in.
      // (The "package.json" file for the "docs" package does not contain any of the actual
      // dependencies.)
      "import-x/no-extraneous-dependencies": [
        "error",
        {
          packageDir: REPO_ROOT,
        },
      ],
    },
  },

  // Since we modified the "import-x/no-extraneous-dependencies" rule above, we have to also
  // copy-paste the override.
  {
    files: ["**/scripts/*.{js,cjs,mjs,ts,cts,mts}"],
    rules: {
      "import-x/no-extraneous-dependencies": "off",
    },
  },

  {
    ignores: ["**/build/**", "**/.docusaurus/**"],
  },
);
