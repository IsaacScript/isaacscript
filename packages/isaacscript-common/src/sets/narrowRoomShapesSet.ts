import { RoomShape } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const NARROW_ROOM_SHAPES_SET = new ReadonlySet<RoomShape>([
  RoomShape.IH, // 2
  RoomShape.IV, // 3
  RoomShape.IIV, // 5
  RoomShape.IIH, // 7
]);
