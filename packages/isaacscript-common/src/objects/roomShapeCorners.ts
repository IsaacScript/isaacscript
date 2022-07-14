import { RoomShape } from "isaac-typescript-definitions";
import { CornerType } from "../enums/CornerType";
import { Corner } from "../interfaces/Corner";

const TWO_BY_TWO_CENTER_X = 580;
const TWO_BY_TWO_CENTER_Y = 420;

/** The locations of the corners for each room shape. */
export const ROOM_SHAPE_CORNERS: {
  readonly [key in RoomShape]: readonly Corner[];
} = {
  // 1
  [RoomShape.SHAPE_1x1]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(580, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 420),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(580, 420),
    },
  ],

  // 2
  [RoomShape.IH]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 220),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(580, 220),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 340),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(580, 340),
    },
  ],

  // 3
  [RoomShape.IV]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(220, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(420, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(220, 420),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(420, 420),
    },
  ],

  // 4
  [RoomShape.SHAPE_1x2]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(580, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(580, 700),
    },
  ],

  // 5
  [RoomShape.IIV]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(220, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(420, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(220, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(420, 700),
    },
  ],

  // 6
  [RoomShape.SHAPE_2x1]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 420),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, 420),
    },
  ],

  // 7
  [RoomShape.IIH]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 220),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, 220),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 340),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, 340),
    },
  ],

  // 8
  [RoomShape.SHAPE_2x2]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, 700),
    },
  ],

  // 9
  [RoomShape.LTL]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(TWO_BY_TWO_CENTER_X, 140), // Center
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, 140),
    },
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, TWO_BY_TWO_CENTER_Y), // Left
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(TWO_BY_TWO_CENTER_X, TWO_BY_TWO_CENTER_Y), // Center
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, 700),
    },
  ],

  // 10
  [RoomShape.LTR]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(TWO_BY_TWO_CENTER_X, 140), // Center
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(TWO_BY_TWO_CENTER_X, TWO_BY_TWO_CENTER_Y), // Center
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, TWO_BY_TWO_CENTER_Y), // Right
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, 700),
    },
  ],

  // 11
  [RoomShape.LBL]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(TWO_BY_TWO_CENTER_X, 140), // Left
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(TWO_BY_TWO_CENTER_X, TWO_BY_TWO_CENTER_Y), // Center
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(TWO_BY_TWO_CENTER_X, 700), // Center
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, 700),
    },
  ],

  // 12
  [RoomShape.LBR]: [
    {
      type: CornerType.TOP_LEFT,
      position: Vector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      position: Vector(1100, 140),
    },
    {
      type: CornerType.TOP_LEFT,
      position: Vector(TWO_BY_TWO_CENTER_X, TWO_BY_TWO_CENTER_Y), // Center
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(1100, TWO_BY_TWO_CENTER_Y), // Right
    },
    {
      type: CornerType.BOTTOM_LEFT,
      position: Vector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      position: Vector(TWO_BY_TWO_CENTER_X, 700), // Right
    },
  ],
} as const;
