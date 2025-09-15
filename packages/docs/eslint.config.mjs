import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...completeConfigBase,

  {
    rules: {
      "import-x/no-default-export": "off", // React uses default exports.
      "n/file-extension-in-import": "off", // Docusaurus does not yet use ESM.

      // Docusaurus does not support the type field:
      // https://github.com/facebook/docusaurus/issues/6520#issuecomment-1832946666
      "package-json/require-type": "off",
    },
  },

  {
    ignores: ["**/.docusaurus/", "**/build/"],
  },
);
