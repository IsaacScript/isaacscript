import tseslint from "typescript-eslint";

/** This config is only meant to be used in this monorepo. */
export const monorepo = tseslint.config({
  files: ["eslint.config.mjs"],
  rules: {
    // ESLint configs in this monorepo intentionally import from the "packages" subdirectory
    // (because we do not want the complexity of ESLint using tsconfig-paths).
    "import-x/no-relative-packages": "off",
  },
});
