// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import tseslint from "typescript-eslint";
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

export default tseslint.config(
  ...completeConfigBase,
  ...isaacScriptModConfigBase,
);
