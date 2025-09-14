// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config"; // eslint-disable-line import-x/no-extraneous-dependencies
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

export default defineConfig(
  // @ts-expect-error TODO
  ...completeConfigBase,
  ...isaacScriptModConfigBase,
);
