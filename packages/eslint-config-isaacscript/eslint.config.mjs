// @ts-check

import {
  completeConfigBase,
  completeConfigMonorepo,
} from "eslint-config-complete";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...completeConfigBase,
  ...completeConfigMonorepo,
);
