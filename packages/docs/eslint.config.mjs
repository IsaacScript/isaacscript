import { FlatCompat } from "@eslint/eslintrc";
// eslint-disable-next-line import-x/no-extraneous-dependencies
import { completeConfigBase } from "eslint-config-complete";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config(
  ...completeConfigBase,
  ...compat.extends("plugin:@docusaurus/recommended"),

  {
    rules: {
      "import-x/no-default-export": "off", // React uses default exports.
      "n/file-extension-in-import": "off", // Docusaurus does not yet use ESM.
      "no-alert": "off",
    },
  },

  {
    ignores: ["**/build/", "**/.docusaurus/"],
  },
);
