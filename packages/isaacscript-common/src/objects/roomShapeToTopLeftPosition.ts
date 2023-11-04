import { RoomShape } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { newReadonlyVector } from "../functions/readOnly";

const NARROW_HORIZONTAL_TOP_LEFT_POSITION = newReadonlyVector(0, 2);
const NARROW_VERTICAL_TOP_LEFT_POSITION = newReadonlyVector(4, 0);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const ROOM_SHAPE_TO_TOP_LEFT_POSITION = {
  [RoomShape.SHAPE_1x1]: VectorZero, // 1
  [RoomShape.IH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 2
  [RoomShape.IV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 3
  [RoomShape.SHAPE_1x2]: VectorZero, // 4
  [RoomShape.IIV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 5
  [RoomShape.SHAPE_2x1]: VectorZero, // 6
  [RoomShape.IIH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 7
  [RoomShape.SHAPE_2x2]: VectorZero, // 8
  [RoomShape.LTL]: newReadonlyVector(13, 0), // 9
  [RoomShape.LTR]: VectorZero, // 10
  [RoomShape.LBL]: VectorZero, // 11
  [RoomShape.LBR]: VectorZero, // 12
} as const satisfies Record<RoomShape, Readonly<Vector>>;
