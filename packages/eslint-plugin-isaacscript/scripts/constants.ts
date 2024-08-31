import { findPackageRoot } from "isaacscript-common-node";
import path from "node:path";

const packageRoot = findPackageRoot();
const packageName = path.basename(packageRoot);
const packageNameWords = packageName.split("-");
const pluginName = packageNameWords.at(-1);
if (pluginName === undefined || pluginName === "") {
  throw new Error("Failed to parse the plugin name from the package name.");
}

export const PLUGIN_NAME = pluginName;
export const PACKAGE_ROOT = path.join(import.meta.dirname, "..");
export const REPO_ROOT = path.join(PACKAGE_ROOT, "..", "..");
