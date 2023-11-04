import type { LevelStage, StageType } from "isaac-typescript-definitions";

export interface CustomTrapdoorDescription {
  destinationName: string | undefined;
  destinationStage: LevelStage;
  destinationStageType: StageType;
  open: boolean;
  firstSpawn: boolean;
}
