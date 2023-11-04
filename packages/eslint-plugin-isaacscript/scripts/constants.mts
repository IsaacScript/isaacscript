import { dirName } from "isaacscript-common-node";
import path from "node:path";

const __dirname = dirName();

export const PLUGIN_NAME = "isaacscript";
export const PACKAGE_ROOT = path.join(__dirname, "..");
export const REPO_ROOT = path.join(PACKAGE_ROOT, "..", "..");
