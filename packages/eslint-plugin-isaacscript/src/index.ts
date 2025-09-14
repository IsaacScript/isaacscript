import type { TSESLint } from "@typescript-eslint/utils";
import type { ReadonlyRecord } from "complete-common";
import packageJSON from "../package.json" with { type: "json" };
import { configs } from "./configs.js";
import { rules } from "./rules.js";

const { name, version } = packageJSON;

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
