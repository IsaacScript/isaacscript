// @ts-check

// eslint-disable-next-line import-x/no-extraneous-dependencies
import {
  completeConfigBase,
  completeConfigMonorepo,
} from "eslint-config-complete";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...completeConfigBase,
  ...completeConfigMonorepo,
);
