// @ts-check

// eslint-disable-next-line import-x/no-extraneous-dependencies
import {
  completeConfigBase,
  completeConfigMonorepo,
} from "eslint-config-complete";
import tseslint from "typescript-eslint";
import { isaacScriptModConfigBase } from "../eslint-config-isaacscript/src/mod.js";

export default tseslint.config(
  ...completeConfigBase,
  ...completeConfigMonorepo,
  ...isaacScriptModConfigBase,
);
