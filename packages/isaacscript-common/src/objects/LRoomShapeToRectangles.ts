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
// We don't use `as const` since we need the object to be indexable by all `RoomShape`.
// eslint-disable-next-line complete/require-capital-const-assertions
export const L_ROOM_SHAPE_TO_RECTANGLES: Readonly<
  Partial<Record<RoomShape, LRoomRectangles>>
> = {
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
};
