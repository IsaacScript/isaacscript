// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config";
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

export default defineConfig(...completeConfigBase, ...isaacScriptModConfigBase);
