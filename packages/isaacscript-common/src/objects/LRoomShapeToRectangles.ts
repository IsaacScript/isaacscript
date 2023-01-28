import { RoomShape } from "isaac-typescript-definitions";
import { VectorZero } from "../core/constants";
import { newReadonlyVector } from "../functions/readOnly";
import { HasSomeEnumKeys } from "../types/HasSomeEnumKeys";

const TWO_BY_TWO_BOTTOM_RIGHT = newReadonlyVector(25, 13);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const L_ROOM_SHAPE_TO_RECTANGLES = {
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
} as const satisfies HasSomeEnumKeys<
  RoomShape,
  readonly [
    Readonly<Vector>,
    Readonly<Vector>,
    Readonly<Vector>,
    Readonly<Vector>,
  ]
>;
