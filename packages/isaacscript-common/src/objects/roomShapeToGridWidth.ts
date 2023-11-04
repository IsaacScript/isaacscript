import { RoomShape } from "isaac-typescript-definitions";

const ONE_BY_ONE_WIDTH = 15;
const TWO_BY_ONE_WIDTH = 28;

export const ROOM_SHAPE_TO_GRID_WIDTH = {
  [RoomShape.SHAPE_1x1]: ONE_BY_ONE_WIDTH, // 1
  [RoomShape.IH]: ONE_BY_ONE_WIDTH, // 2
  [RoomShape.IV]: ONE_BY_ONE_WIDTH, // 3
  [RoomShape.SHAPE_1x2]: ONE_BY_ONE_WIDTH, // 4
  [RoomShape.IIV]: ONE_BY_ONE_WIDTH, // 5
  [RoomShape.SHAPE_2x1]: TWO_BY_ONE_WIDTH, // 6
  [RoomShape.IIH]: TWO_BY_ONE_WIDTH, // 7
  [RoomShape.SHAPE_2x2]: TWO_BY_ONE_WIDTH, // 8
  [RoomShape.LTL]: TWO_BY_ONE_WIDTH, // 9
  [RoomShape.LTR]: TWO_BY_ONE_WIDTH, // 10
  [RoomShape.LBL]: TWO_BY_ONE_WIDTH, // 11
  [RoomShape.LBR]: TWO_BY_ONE_WIDTH, // 12
} as const satisfies Record<RoomShape, int>;
