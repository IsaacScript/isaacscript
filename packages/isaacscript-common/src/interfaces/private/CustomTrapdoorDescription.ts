import type { LevelStage, StageType } from "isaac-typescript-definitions";

export interface CustomTrapdoorDescription {
  readonly destinationName: string | undefined;
  readonly destinationStage: LevelStage;
  readonly destinationStageType: StageType;
  open: boolean;
  readonly firstSpawn: boolean;
}
