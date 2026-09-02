import type { LevelStage, StageType } from "isaac-typescript-definitions";

// eslint-disable-next-line complete/type-declaration-immutability
export interface CustomTrapdoorDescription {
  readonly destinationName: string | undefined;
  readonly destinationStage: LevelStage;
  readonly destinationStageType: StageType;
  open: boolean;
  readonly firstSpawn: boolean;
}
