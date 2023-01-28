import { RoomShape } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { newReadonlyVector } from "../functions/readOnly";

const TWO_BY_TWO_BOTTOM_RIGHT: Readonly<Vector> = Vector(25, 13);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
// We need the tuples to be read-only, so we specify the type instead of using the `satisfies`
// operator.
export const L_ROOM_SHAPE_TO_RECTANGLES: {
  readonly [Key in RoomShape]?: readonly [
    verticalTopLeft: Readonly<Vector>,
    verticalBottomRight: Readonly<Vector>,
    horizontalTopLeft: Readonly<Vector>,
    horizontalBottomRight: Readonly<Vector>,
  ];
} = {
  // 9
  [RoomShape.LTL]: [
    newReadonlyVector(13, 0),
    newReadonlyVector(25, 13),
    newReadonlyVector(0, 7),
    TWO_BY_TWO_BOTTOM_RIGHT,
  ],

  // 10
  [RoomShape.LTR]: [
    VectorZero,
    newReadonlyVector(12, 13),
    newReadonlyVector(0, 7),
    TWO_BY_TWO_BOTTOM_RIGHT,
  ],

  // 11
  [RoomShape.LBL]: [
    VectorZero,
    newReadonlyVector(25, 6),
    newReadonlyVector(13, 0),
    TWO_BY_TWO_BOTTOM_RIGHT,
  ],

  // 12
  [RoomShape.LBR]: [
    VectorZero,
    newReadonlyVector(25, 6),
    VectorZero,
    newReadonlyVector(12, 13),
  ],
} as const;
