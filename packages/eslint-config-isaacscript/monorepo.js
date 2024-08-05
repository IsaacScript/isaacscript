import path from "node:path";
import tseslint from "typescript-eslint";

const REPO_ROOT = path.join(import.meta.dirname, "..", "..");

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

  // The "isaacscript-common-node" dependency is used in scripts and should never appear in a
  // "package.json" file (if it is only used in script files). This has to be a monorepo disable
  // because in a normal project, "isaacscript-common-node" should be required in "devDependencies".
  {
    files: ["**/scripts/*.{js,cjs,mjs,ts,cts,mts}"],
    rules: {
      "import-x/no-extraneous-dependencies": "off",
    },
  },

  {
    files: ["eslint.config.mjs"],
    rules: {
      // ESLint configs in this monorepo intentionally import from the "packages" subdirectory
      // (because we do not want the complexity of ESLint having to use tsconfig-paths).
      "import-x/no-relative-packages": "off",

      // ESLint configs import from "typescript-eslint", but this is installed at the monorepo root
      // instead of in the packages' "package.json" file.
      "import-x/no-extraneous-dependencies": "off",
    },
  },

  // All packages in this monorepo use a "dist" directory for compiled output.
  {
    ignores: ["**/dist/**"],
  },
);
