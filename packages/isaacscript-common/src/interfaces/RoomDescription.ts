import type {
  Dimension,
  LevelStage,
  RoomType,
  StageID,
  StageType,
} from "isaac-typescript-definitions";

/** This is used by the room history feature of the standard library. */
export interface RoomDescription {
  readonly startSeedString: string;
  readonly stage: LevelStage;
  readonly stageType: StageType;
  readonly stageID: StageID | -1;
  readonly dimension: Dimension;
  readonly roomType: RoomType;
  readonly roomVariant: int;
  readonly roomSubType: int;
  readonly roomName: string;
  readonly roomGridIndex: int;
  readonly roomListIndex: int;
  readonly roomVisitedCount: int;
}
