import { LevelStage, StageType } from "isaac-typescript-definitions";

export interface CustomTrapdoorDescription {
  open: boolean;
  destination:
    | [stage: LevelStage, stageType: StageType]
    | [customStageName: string, floorNum: int];
  firstSpawn: boolean;
}
