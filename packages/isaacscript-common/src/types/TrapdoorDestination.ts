import { LevelStage, StageType } from "isaac-typescript-definitions";

/**
 * This is the type that you need to specify when using the `spawnCustomTrapdoor` helper function.
 */
export type TrapdoorDestination =
  | [stage: LevelStage, stageType: StageType]
  | [customStageName: string, floorNum: int];
