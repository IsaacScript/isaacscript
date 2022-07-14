import { RoomShape } from "isaac-typescript-definitions";

export const NARROW_ROOM_SHAPES_SET: ReadonlySet<RoomShape> = new Set([
  RoomShape.IH, // 2
  RoomShape.IV, // 3
  RoomShape.IIV, // 5
  RoomShape.IIH, // 7
]);
