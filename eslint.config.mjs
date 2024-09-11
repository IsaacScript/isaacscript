// @ts-check

import {
  completeConfigBase,
  completeConfigMonorepo,
} from "eslint-config-complete";

export default [...completeConfigBase, ...completeConfigMonorepo];
