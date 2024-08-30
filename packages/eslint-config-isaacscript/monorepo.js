import tseslint from "typescript-eslint";

/** This config is only meant to be used in this monorepo. */
export const monorepo = tseslint.config(
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
      // (because we do not want the complexity of ESLint using tsconfig-paths).
      "import-x/no-relative-packages": "off",

      // ESLint configs import from "typescript-eslint", but this is installed at the monorepo root
      // instead of in the individual package "package.json" file.
      "import-x/no-extraneous-dependencies": "off",
    },
  },
);
