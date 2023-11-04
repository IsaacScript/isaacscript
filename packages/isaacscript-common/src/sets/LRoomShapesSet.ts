import { RoomShape } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const L_ROOM_SHAPES_SET = new ReadonlySet<RoomShape>([
  RoomShape.LTL, // 9
  RoomShape.LTR, // 10
  RoomShape.LBL, // 11
  RoomShape.LBR, // 12
]);
