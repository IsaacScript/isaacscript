import { RoomShape } from "isaac-typescript-definitions";
import { VectorZero } from "../constants";

const TWO_BY_TWO_BOTTOM_RIGHT = Vector(25, 13);

/**
 * "Vector(0, 0)" corresponds to the top left tile of a room, not including the walls. (The top-left
 * wall would be at "Vector(-1, -1)".)
 */
export const L_ROOM_SHAPE_TO_RECTANGLES: {
  [key in RoomShape]?: [
    verticalTopLeft: Vector,
    verticalBottomRight: Vector,
    horizontalTopLeft: Vector,
    horizontalBottomRight: Vector,
  ];
} = {
  // 9
  [RoomShape.LTL]: [
    Vector(13, 0),
    Vector(25, 13),
    Vector(0, 7),
    TWO_BY_TWO_BOTTOM_RIGHT,
  ],

  // 10
  [RoomShape.LTR]: [
    VectorZero,
    Vector(12, 13),
    Vector(0, 7),
    TWO_BY_TWO_BOTTOM_RIGHT,
  ],

  // 11
  [RoomShape.LBL]: [
    VectorZero,
    Vector(25, 6),
    Vector(13, 0),
    TWO_BY_TWO_BOTTOM_RIGHT,
  ],

  // 12
  [RoomShape.LBR]: [VectorZero, Vector(25, 6), VectorZero, Vector(12, 13)],
};
