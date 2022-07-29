import { LevelStage, StageType } from "isaac-typescript-definitions";

export type TrapdoorDestination =
  | [stage: LevelStage, stageType: StageType]
  | [customStageName: string, floorNum: int];
