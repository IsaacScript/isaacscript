// This is the configuration file for Knip:
// https://knip.dev/overview/configuration

// @ts-check

/** @type {import("knip").KnipConfig} */
const config = {
  ignore: ["eslint.config.mjs"],

  // Ignore all dependencies in the root. (This is checked by the `lintMonorepoPackageJSONs` helper
  // function.)
  ignoreDependencies: [".+"],

  // Knip cannot exclude enum members per package:
  // https://github.com/webpro-nl/knip/issues/794
  exclude: ["enumMembers"],

  workspaces: {
    "packages/*": {},
    "packages/docs": {
      ignore: [
        "eslint.config.mjs",
        "scripts/**",
        "sidebars.ts",
        "src/**/index.tsx",
      ],
    },
    "packages/eslint-plugin-isaacscript": {
      ignore: [
        "eslint.config.mjs",
        "src/template.ts",
        "tests/fixtures/file.ts",
        "tests/template.ts",
      ],
    },
    "packages/isaac-lua-polyfill": {
      ignore: ["eslint.config.mjs"],
    },
    "packages/isaac-typescript-definitions": {
      ignore: ["eslint.config.mjs"],
    },
    "packages/isaacscript-cli": {
      entry: [
        "src/commands/monitor/modDirectorySyncer/modDirectorySyncer.ts",
        "src/commands/monitor/saveDatWriter/saveDatWriter.ts",
      ],
      ignore: [
        "**/copied/**",
        "eslint.config.mjs",
        "file-templates/**",
        "plugins/**",
        "src/interfaces/IsaacScriptTSConfig.ts",
      ],
    },
    "packages/isaacscript-common": {
      ignore: ["eslint.config.mjs"],
    },
    "packages/isaacscript-spell": {
      ignore: ["eslint.config.mjs"],
    },
  },
};

export default config;
