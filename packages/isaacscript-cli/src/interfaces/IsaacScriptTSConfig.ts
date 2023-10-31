import type { CustomStageTSConfig } from "isaacscript-common";

/**
 * This is the format of the "isaacscript" section of the "tsconfig.json" file.
 *
 * We use this interface to automatically generate the schema using the "ts-json-schema-generator"
 * library.
 */
export interface IsaacScriptTSConfig {
  customStages?: CustomStageTSConfig[];
}
