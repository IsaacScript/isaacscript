import { RoomShape } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { newReadonlyVector } from "../functions/readOnly";

interface LRoomRectangles {
  readonly verticalTopLeft: Readonly<Vector>;
  readonly verticalBottomRight: Readonly<Vector>;
  readonly horizontalTopLeft: Readonly<Vector>;
  readonly horizontalBottomRight: Readonly<Vector>;
}

const TWO_BY_TWO_BOTTOM_RIGHT = newReadonlyVector(25, 13);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
// We need to specify the type so that the object will be indexable by room shapes.
export const L_ROOM_SHAPE_TO_RECTANGLES: {
  readonly [Key in RoomShape]?: LRoomRectangles;
} = {
  // 9
  [RoomShape.LTL]: {
    verticalTopLeft: newReadonlyVector(13, 0),
    verticalBottomRight: newReadonlyVector(25, 13),
    horizontalTopLeft: newReadonlyVector(0, 7),
    horizontalBottomRight: TWO_BY_TWO_BOTTOM_RIGHT,
  },

  // 10
  [RoomShape.LTR]: {
    verticalTopLeft: VectorZero,
    verticalBottomRight: newReadonlyVector(12, 13),
    horizontalTopLeft: newReadonlyVector(0, 7),
    horizontalBottomRight: TWO_BY_TWO_BOTTOM_RIGHT,
  },

  // 11
  [RoomShape.LBL]: {
    verticalTopLeft: VectorZero,
    verticalBottomRight: newReadonlyVector(25, 6),
    horizontalTopLeft: newReadonlyVector(13, 0),
    horizontalBottomRight: TWO_BY_TWO_BOTTOM_RIGHT,
  },

  // 12
  [RoomShape.LBR]: {
    verticalTopLeft: VectorZero,
    verticalBottomRight: newReadonlyVector(25, 6),
    horizontalTopLeft: VectorZero,
    horizontalBottomRight: newReadonlyVector(12, 13),
  },
} as const;
