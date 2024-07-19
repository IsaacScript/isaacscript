import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.join(__dirname, "..", "..");

/** This config is meant to be used in the IsaacScript monorepo. */
export const monorepo = tseslint.config(
  {
    languageOptions: {
      // We need to add the `tsconfigRootDir` property, but we must also repeat the options from
      // "base-typescript-eslint.js" or they will be deleted.
      parserOptions: {
        sourceType: "module",
        project: true,
        ecmaVersion: "latest",

        tsconfigRootDir: REPO_ROOT,
      },
    },
  },

  {
    // The "isaacscript-common-node" dependency is used in scripts and should never appear in a
    // "package.json" file (if it is only used in script files). This has to be a monorepo disable
    // because in a normal project, "isaacscript-common-node" should be required in
    // "devDependencies".
    files: ["**/scripts/*.{js,cjs,mjs,ts,cts,mts}"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },

  {
    ignores: ["**/dist/**"],
  },
);
