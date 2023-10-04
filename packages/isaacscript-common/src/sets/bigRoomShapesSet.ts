import { RoomShape } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const BIG_ROOM_SHAPES_SET = new ReadonlySet<RoomShape>([
  RoomShape.SHAPE_1x2, // 4
  RoomShape.SHAPE_2x1, // 6
  RoomShape.SHAPE_2x2, // 8
  RoomShape.LTL, // 9
  RoomShape.LTR, // 10
  RoomShape.LBL, // 11
  RoomShape.LBR, // 12
]);
