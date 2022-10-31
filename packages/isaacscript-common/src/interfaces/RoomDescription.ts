import {
  Dimension,
  LevelStage,
  RoomType,
  StageID,
  StageType,
} from "isaac-typescript-definitions";

/** This is used by the room history feature of the standard library. */
export interface RoomDescription {
  stage: LevelStage;
  stageType: StageType;
  stageID: StageID;
  dimension: Dimension;
  roomType: RoomType;
  roomVariant: int;
  roomSubType: int;
  roomName: string;
  roomGridIndex: int;
  roomListIndex: int;
  roomVisitedCount: int;
}
