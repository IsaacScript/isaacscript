import { RoomShape } from "isaac-typescript-definitions";
import {
  ONE_BY_ONE_CONTENTS_HEIGHT,
  ONE_BY_ONE_CONTENTS_WIDTH,
} from "./roomShapeVolumes";

const ONE_BY_ONE_LAYOUT_SIZE = [
  ONE_BY_ONE_CONTENTS_WIDTH,
  ONE_BY_ONE_CONTENTS_HEIGHT,
] as const;
const TWO_BY_ONE_VERTICAL_LAYOUT_SIZE = [
  ONE_BY_ONE_CONTENTS_WIDTH,
  ONE_BY_ONE_CONTENTS_HEIGHT * 2,
] as const;
const TWO_BY_ONE_HORIZONTAL_LAYOUT_SIZE = [
  ONE_BY_ONE_CONTENTS_WIDTH * 2,
  ONE_BY_ONE_CONTENTS_HEIGHT,
] as const;
const TWO_BY_TWO_LAYOUT_SIZE = [
  ONE_BY_ONE_CONTENTS_WIDTH * 2,
  ONE_BY_ONE_CONTENTS_HEIGHT * 2,
] as const;

/**
 * The dimensions of a room shape's layout. This is NOT the size of the room's actual contents! For
 * that, use `ROOM_SHAPE_BOUNDS`.
 *
 * For example, a horizontal narrow room has a layout size of equal to that of a 1x1 room.
 */
export const ROOM_SHAPE_LAYOUT_SIZES = {
  [RoomShape.SHAPE_1x1]: ONE_BY_ONE_LAYOUT_SIZE, // 1
  [RoomShape.IH]: ONE_BY_ONE_LAYOUT_SIZE, // 2
  [RoomShape.IV]: ONE_BY_ONE_LAYOUT_SIZE, // 3
  [RoomShape.SHAPE_1x2]: TWO_BY_ONE_VERTICAL_LAYOUT_SIZE, // 4
  [RoomShape.IIV]: TWO_BY_ONE_VERTICAL_LAYOUT_SIZE, // 5
  [RoomShape.SHAPE_2x1]: TWO_BY_ONE_HORIZONTAL_LAYOUT_SIZE, // 6
  [RoomShape.IIH]: TWO_BY_ONE_HORIZONTAL_LAYOUT_SIZE, // 7
  [RoomShape.SHAPE_2x2]: TWO_BY_TWO_LAYOUT_SIZE, // 8
  [RoomShape.LTL]: TWO_BY_TWO_LAYOUT_SIZE, // 9
  [RoomShape.LTR]: TWO_BY_TWO_LAYOUT_SIZE, // 10
  [RoomShape.LBL]: TWO_BY_TWO_LAYOUT_SIZE, // 11
  [RoomShape.LBR]: TWO_BY_TWO_LAYOUT_SIZE, // 12
} as const satisfies Record<RoomShape, readonly [int, int]>;
