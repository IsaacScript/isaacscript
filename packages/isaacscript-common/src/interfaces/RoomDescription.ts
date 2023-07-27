import type {
  Dimension,
  LevelStage,
  RoomType,
  StageID,
  StageType,
} from "isaac-typescript-definitions";

/** This is used by the room history feature of the standard library. */
export interface RoomDescription {
  startSeedString: string;
  stage: LevelStage;
  stageType: StageType;
  stageID: StageID | -1;
  dimension: Dimension;
  roomType: RoomType;
  roomVariant: int;
  roomSubType: int;
  roomName: string;
  roomGridIndex: int;
  roomListIndex: int;
  roomVisitedCount: int;
}
