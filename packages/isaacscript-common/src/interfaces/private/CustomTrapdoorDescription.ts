import { LevelStage, StageType } from "isaac-typescript-definitions";

export interface CustomTrapdoorDescription {
  open: boolean;
  destination: [stage: LevelStage, stageType: StageType] | string;
  firstSpawn: boolean;
}
