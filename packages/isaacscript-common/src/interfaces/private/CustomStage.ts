import {
  DoorSlotFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { CustomStageLua, CustomStageRoomMetadata } from "../CustomStageLua";

export interface CustomStage extends CustomStageLua {
  /** A map that makes it easier to select certain room type/shape/door combinations. */
  readonly roomTypeMap: RoomTypeMap;
}

export type RoomTypeMap = ReadonlyMap<RoomType, RoomShapeMap>;
type RoomShapeMap = ReadonlyMap<RoomShape, RoomDoorSlotMap>;
type RoomDoorSlotMap = ReadonlyMap<DoorSlotFlag, CustomStageRoomMetadata[]>;
