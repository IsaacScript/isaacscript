import { RoomShape } from "isaac-typescript-definitions";
import { newReadonlyVector } from "../functions/readOnly";

const TWO_BY_TWO_BOTTOM_RIGHT_POSITION = newReadonlyVector(25, 13);
const ONE_BY_TWO_VERTICAL_BOTTOM_RIGHT_POSITION = newReadonlyVector(12, 13);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const ROOM_SHAPE_TO_BOTTOM_RIGHT_POSITION = {
  [RoomShape.SHAPE_1x1]: newReadonlyVector(12, 6), // 1
  [RoomShape.IH]: newReadonlyVector(12, 4), // 2
  [RoomShape.IV]: newReadonlyVector(8, 6), // 3
  [RoomShape.SHAPE_1x2]: ONE_BY_TWO_VERTICAL_BOTTOM_RIGHT_POSITION, // 4
  [RoomShape.IIV]: newReadonlyVector(8, 13), // 5
  [RoomShape.SHAPE_2x1]: newReadonlyVector(25, 6), // 6
  [RoomShape.IIH]: newReadonlyVector(25, 4), // 7
  [RoomShape.SHAPE_2x2]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 8
  [RoomShape.LTL]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 9
  [RoomShape.LTR]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 10
  [RoomShape.LBL]: TWO_BY_TWO_BOTTOM_RIGHT_POSITION, // 11
  [RoomShape.LBR]: ONE_BY_TWO_VERTICAL_BOTTOM_RIGHT_POSITION, // 12
} as const satisfies Record<RoomShape, Readonly<Vector>>;
