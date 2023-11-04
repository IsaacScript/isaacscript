import { RoomShape } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

export const DEFAULT_TOP_LEFT_WALL_GRID_INDEX = 0;

/**
 * Only used for special room shapes where the top left wall grid index is not equal to
 * `DEFAULT_TOP_LEFT_WALL_GRID_INDEX`.
 */
export const ROOM_SHAPE_TO_TOP_LEFT_WALL_GRID_INDEX_MAP = new ReadonlyMap<
  RoomShape,
  int
>([
  [RoomShape.IH, 30], // 2
  [RoomShape.IV, 4], // 3
  [RoomShape.IIV, 4], // 5
  [RoomShape.IIH, 56], // 7
  [RoomShape.LTL, 13], // 9
]);
