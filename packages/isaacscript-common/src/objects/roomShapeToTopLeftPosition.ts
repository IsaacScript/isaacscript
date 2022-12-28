import { RoomShape } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";

const NARROW_HORIZONTAL_TOP_LEFT_POSITION: Readonly<Vector> = Vector(0, 2);
const NARROW_VERTICAL_TOP_LEFT_POSITION: Readonly<Vector> = Vector(4, 0);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
// We need the vectors to be read-only, so we specify the type instead of using the `satisfies`
// operator.
export const ROOM_SHAPE_TO_TOP_LEFT_POSITION: {
  readonly [Key in RoomShape]: Readonly<Vector>;
} = {
  [RoomShape.SHAPE_1x1]: VectorZero, // 1
  [RoomShape.IH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 2
  [RoomShape.IV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 3
  [RoomShape.SHAPE_1x2]: VectorZero, // 4
  [RoomShape.IIV]: NARROW_VERTICAL_TOP_LEFT_POSITION, // 5
  [RoomShape.SHAPE_2x1]: VectorZero, // 6
  [RoomShape.IIH]: NARROW_HORIZONTAL_TOP_LEFT_POSITION, // 7
  [RoomShape.SHAPE_2x2]: VectorZero, // 8
  [RoomShape.LTL]: Vector(13, 0), // 9
  [RoomShape.LTR]: VectorZero, // 10
  [RoomShape.LBL]: VectorZero, // 11
  [RoomShape.LBR]: VectorZero, // 12
} as const;
