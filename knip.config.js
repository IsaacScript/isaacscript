// This is the configuration file for Knip:
// https://knip.dev/overview/configuration

// @ts-check

/** @type {import("knip").KnipConfig} */
const config = {
  // Knip cannot exclude enum members per package:
  // https://github.com/webpro-nl/knip/issues/794
  exclude: ["enumMembers"],

  ignoreBinaries: [
    "tsx", // This is provided by "complete-lint".
  ],

  // Ignore all dependencies in the root. (This is checked by the `lintMonorepoPackageJSONs` helper
  // function.)
  ignoreDependencies: [".+"],

  workspaces: {
    "packages/*": {},
    "packages/docs": {
      ignore: [
        "babel.config.js",
        "docusaurus.config.ts",
        "scripts/**",
        "sidebars.ts",
        "src/**/index.tsx",
        "static/js/hotkey.js",
        "typedoc.config.base.mjs",
      ],
    },
    "packages/eslint-config-isaacscript": {
      entry: ["base.js", "mod.js"],
    },
    "packages/eslint-plugin-isaacscript": {
      ignore: [
        "src/template.ts",
        "tests/fixtures/file.ts",
        "tests/template.ts",
      ],
    },
    "packages/isaac-lua-polyfill": {},
    "packages/isaac-typescript-definitions": {
      ignore: ["typedoc.config.mjs"],
    },
    "packages/isaac-typescript-definitions-repentogon": {
      ignore: ["typedoc.config.mjs"],
    },
    "packages/isaacscript-cli": {
      entry: [
        "src/main.ts",
        "src/commands/monitor/modDirectorySyncer/modDirectorySyncer.ts",
        "src/commands/monitor/saveDatWriter/saveDatWriter.ts",
      ],
      ignore: [
        "**/copied/**",
        "file-templates/**",
        "plugins/**",
        "src/interfaces/IsaacScriptTSConfig.ts",
      ],
    },
    "packages/isaacscript-common": {
      ignore: [
        "src/classes/features/other/extraConsoleCommands/commands.ts",
        "src/lib/jsonLua.js",
        "typedoc.config.mjs",
      ],
    },
    "packages/isaacscript-spell": {},
  },
};

export default config;
