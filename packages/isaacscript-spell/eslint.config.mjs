// @ts-check

import { completeConfigBase } from "eslint-config-complete";
import tseslint from "typescript-eslint";

export default tseslint.config(...completeConfigBase);
