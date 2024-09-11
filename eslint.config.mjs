// @ts-check

// eslint-disable-next-line import-x/no-extraneous-dependencies
import {
  completeConfigBase,
  completeConfigMonorepo,
} from "eslint-config-complete";

export default [...completeConfigBase, ...completeConfigMonorepo];
