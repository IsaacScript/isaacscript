import { LevelStage, StageType } from "isaac-typescript-definitions";

/**
 * - If the destination is a custom stage, then `vanillaStage` and `vanillaStageType` will be
 *   undefined.
 * - If the destination is a vanilla stage, then `customStageName` and `customStageFloorNum` will be
 *   undefined.
 */
export interface CustomTrapdoorDestination {
  customStageName?: string;
  customStageFloorNum?: int;
  vanillaStage?: LevelStage;
  vanillaStageType?: StageType;
}
