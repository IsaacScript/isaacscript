import { RoomShape } from "isaac-typescript-definitions";
import { CornerType } from "../enums/CornerType";
import { newReadonlyVector } from "../functions/readOnly";
import type { Corner } from "../interfaces/Corner";

/**
 * The locations of the corners for each room shape.
 *
 * Note that these corner locations are not accurate for the Mother Boss Room and the Home closet
 * rooms. (Those rooms have custom shapes.)
 */
export const ROOM_SHAPE_CORNERS = {
  // 1
  [RoomShape.SHAPE_1x1]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 14,
      position: newReadonlyVector(580, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 120,
      position: newReadonlyVector(60, 420),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 134,
      position: newReadonlyVector(580, 420),
    },
  ],

  // 2
  [RoomShape.IH]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 30,
      position: newReadonlyVector(60, 220),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 44,
      position: newReadonlyVector(580, 220),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 90,
      position: newReadonlyVector(60, 340),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 104,
      position: newReadonlyVector(580, 340),
    },
  ],

  // 3
  [RoomShape.IV]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 4,
      position: newReadonlyVector(220, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 10,
      position: newReadonlyVector(420, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 124,
      position: newReadonlyVector(220, 420),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 130,
      position: newReadonlyVector(420, 420),
    },
  ],

  // 4
  [RoomShape.SHAPE_1x2]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 14,
      position: newReadonlyVector(580, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 225,
      position: newReadonlyVector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 239,
      position: newReadonlyVector(580, 700),
    },
  ],

  // 5
  [RoomShape.IIV]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 4,
      position: newReadonlyVector(220, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 10,
      position: newReadonlyVector(420, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 229,
      position: newReadonlyVector(220, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 235,
      position: newReadonlyVector(420, 700),
    },
  ],

  // 6
  [RoomShape.SHAPE_2x1]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 27,
      position: newReadonlyVector(1100, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 224,
      position: newReadonlyVector(60, 420),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 251,
      position: newReadonlyVector(1100, 420),
    },
  ],

  // 7
  [RoomShape.IIH]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 56,
      position: newReadonlyVector(60, 220),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 83,
      position: newReadonlyVector(1100, 220),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 168,
      position: newReadonlyVector(60, 340),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 195,
      position: newReadonlyVector(1100, 340),
    },
  ],

  // 8
  [RoomShape.SHAPE_2x2]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 27,
      position: newReadonlyVector(1100, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 420,
      position: newReadonlyVector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 447,
      position: newReadonlyVector(1100, 700),
    },
  ],

  // 9
  [RoomShape.LTL]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 13,
      position: newReadonlyVector(580, 140), // Center
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 27,
      position: newReadonlyVector(1100, 140),
    },
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 196,
      position: newReadonlyVector(60, 420), // Left
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 209,
      position: newReadonlyVector(580, 420), // Center
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 420,
      position: newReadonlyVector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 447,
      position: newReadonlyVector(1100, 700),
    },
  ],

  // 10
  [RoomShape.LTR]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 14,
      position: newReadonlyVector(580, 140), // Center
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 210,
      position: newReadonlyVector(580, 420), // Center
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 223,
      position: newReadonlyVector(1100, 420), // Right
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 420,
      position: newReadonlyVector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 447,
      position: newReadonlyVector(1100, 700),
    },
  ],

  // 11
  [RoomShape.LBL]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 27,
      position: newReadonlyVector(1100, 140),
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 224,
      position: newReadonlyVector(580, 140), // Left
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 237,
      position: newReadonlyVector(580, 420), // Center
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 433,
      position: newReadonlyVector(580, 700), // Center
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 447,
      position: newReadonlyVector(1100, 700),
    },
  ],

  // 12
  [RoomShape.LBR]: [
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 0,
      position: newReadonlyVector(60, 140),
    },
    {
      type: CornerType.TOP_RIGHT,
      gridIndex: 27,
      position: newReadonlyVector(1100, 140),
    },
    {
      type: CornerType.TOP_LEFT,
      gridIndex: 238,
      position: newReadonlyVector(580, 420), // Center
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 251,
      position: newReadonlyVector(1100, 420), // Right
    },
    {
      type: CornerType.BOTTOM_LEFT,
      gridIndex: 420,
      position: newReadonlyVector(60, 700),
    },
    {
      type: CornerType.BOTTOM_RIGHT,
      gridIndex: 434,
      position: newReadonlyVector(580, 700), // Right
    },
  ],
} as const satisfies Record<RoomShape, readonly Corner[]>;
