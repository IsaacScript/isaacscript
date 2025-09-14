// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import { defineConfig } from "eslint/config";

export default defineConfig(
  // @ts-expect-error TODO
  ...completeConfigBase,
);
