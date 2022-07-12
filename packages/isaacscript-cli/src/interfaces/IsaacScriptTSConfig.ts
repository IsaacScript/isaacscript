/* eslint-disable @nrwl/nx/enforce-module-boundaries,import/no-relative-packages */

import { CustomStageTSConfig } from "../../../isaacscript-common/src/interfaces/CustomStageTSConfig";

/** This is the format of the "isaacscript" section of the "tsconfig.json" file. */
export interface IsaacScriptTSConfig {
  customStages: CustomStageTSConfig[];
}
