import { MinesRoomSubType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const MINE_SHAFT_ROOM_SUB_TYPE_SET = new ReadonlySet<MinesRoomSubType>([
  MinesRoomSubType.MINESHAFT_ENTRANCE,
  MinesRoomSubType.MINESHAFT_LOBBY,
  MinesRoomSubType.MINESHAFT_KNIFE_PIECE,
  MinesRoomSubType.MINESHAFT_ROOM_PRE_CHASE,
  MinesRoomSubType.MINESHAFT_ROOM_POST_CHASE,
]);
