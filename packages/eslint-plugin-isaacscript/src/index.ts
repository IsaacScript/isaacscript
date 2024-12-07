import type { TSESLint } from "@typescript-eslint/utils";
import type { ReadonlyRecord } from "complete-common";
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

addPluginToConfigs(configs, name);

// ESLint plugins must provide a default export by design.
// eslint-disable-next-line
export default plugin;

/**
 * We parse the package JSON manually since importing JSON files directly in Node is experimental.
 */
function getPackageJSON(): Record<string, unknown> {
  const packageRoot = path.join(import.meta.dirname, "..");
  const packageJSONPath = path.join(packageRoot, "package.json");
  try {
    const packageJSONString = fs.readFileSync(packageJSONPath, "utf8");
    return JSON.parse(packageJSONString) as Record<string, unknown>;
  } catch (error) {
    throw new Error(`Failed to read the "${packageJSONPath}" file: ${error}`);
  }
}

/** @see https://eslint.org/docs/latest/extend/plugins#configs-in-plugins */
function addPluginToConfigs(
  configsToMutate: ReadonlyRecord<string, TSESLint.FlatConfig.ConfigArray>,
  packageName: unknown,
) {
  if (typeof packageName !== "string") {
    throw new TypeError(
      'Failed to parse the plugin name from the "package.json" file.',
    );
  }

  const packageNameWords = packageName.split("-");
  const pluginName = packageNameWords.at(-1);
  if (pluginName === undefined || pluginName === "") {
    throw new Error("Failed to parse the plugin name from the package name.");
  }

  for (const configArray of Object.values(configsToMutate)) {
    for (const config of configArray) {
      if (config.plugins !== undefined) {
        Object.assign(config.plugins, {
          [pluginName]: plugin,
        });
      }
    }
  }
}
