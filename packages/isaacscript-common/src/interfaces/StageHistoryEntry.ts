import type { LevelStage, StageType } from "isaac-typescript-definitions";

/** This is used by the `StageHistory` feature. */
export interface StageHistoryEntry {
  readonly stage: LevelStage;
  readonly stageType: StageType;
}
