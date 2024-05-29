import path from "node:path";

export const PLUGIN_NAME = "isaacscript";
export const PACKAGE_ROOT = path.join(import.meta.dirname, "..");
export const REPO_ROOT = path.join(PACKAGE_ROOT, "..", "..");
