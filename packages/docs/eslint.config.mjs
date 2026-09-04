import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config";

export default defineConfig(
  ...completeConfigBase,

  {
    rules: {
      "import-x/no-default-export": "off",
    },
  },

  { ignores: [".astro/", "dist/", "src/content/docs/"] },
);
