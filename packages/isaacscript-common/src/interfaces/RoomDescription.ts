import {
  LevelStage,
  RoomType,
  StageID,
  StageType,
} from "isaac-typescript-definitions";

/** Used by the room history feature. */
export interface RoomDescription {
  stage: LevelStage;
  stageType: StageType;
  stageID: StageID;
  roomType: RoomType;
  roomVariant: int;
  roomSubType: int;
  roomName: string;
  roomGridIndex: int;
  roomListIndex: int;
}
