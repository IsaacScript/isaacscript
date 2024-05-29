import type { TSESLint } from "@typescript-eslint/utils";
import fs from "node:fs";
import path from "node:path";
import { configs } from "./configs.js";
import { rules } from "./rules.js";

const { name, version } = getPackageJSON();

const plugin = {
  meta: {
    name,
    version,
  },
  configs,
  rules,
};

addPluginToConfigs(configs);

export default plugin;

/**
 * We parse the package JSON manually since importing JSON files directly in Node is experimental.
 */
function getPackageJSON(): Record<string, unknown> {
  const packageJSONPath = path.join(import.meta.dirname, "..", "package.json");
  try {
    const packageJSONString = fs.readFileSync(packageJSONPath, "utf8");
    return JSON.parse(packageJSONString);
  } catch (error) {
    throw new Error(`Failed to read the "${packageJSONPath}" file: ${error}`);
  }
}

/** @see https://eslint.org/docs/latest/extend/plugins#configs-in-plugins */
function addPluginToConfigs(
  configs: Record<string, TSESLint.FlatConfig.ConfigArray>,
) {
  for (const configArray of Object.values(configs)) {
    for (const config of configArray) {
      if (config.plugins !== undefined) {
        Object.assign(config.plugins, {
          isaacscript: plugin,
        });
      }
    }
  }
}
