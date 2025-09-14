import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config"; // eslint-disable-line import-x/no-extraneous-dependencies

export default defineConfig(
  ...completeConfigBase,

  {
    rules: {
      "import-x/no-default-export": "off", // React uses default exports.
      "n/file-extension-in-import": "off", // Docusaurus does not yet use ESM.
      "no-alert": "off",
    },
  },

  {
    ignores: ["**/.docusaurus/", "**/build/"],
  },
);
