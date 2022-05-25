import { MinesRoomSubType } from "isaac-typescript-definitions";

export const MINE_SHAFT_ROOM_SUB_TYPE_SET: ReadonlySet<MinesRoomSubType> =
  new Set([
    MinesRoomSubType.MINESHAFT_ENTRANCE,
    MinesRoomSubType.MINESHAFT_LOBBY,
    MinesRoomSubType.MINESHAFT_KNIFE_PIECE,
    MinesRoomSubType.MINESHAFT_ROOM_PRE_CHASE,
    MinesRoomSubType.MINESHAFT_ROOM_POST_CHASE,
  ]);
