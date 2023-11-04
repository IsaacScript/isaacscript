import { DoorSlot, RoomShape } from "isaac-typescript-definitions";

/**
 * The coordinates correspond to the x and y values that are present in a room's XML file.
 *
 * e.g. `<door exists="False" x="-1" y="3" />`
 */
export const ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES = {
  // 1
  [RoomShape.SHAPE_1x1]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [13, 3], // 2
    [DoorSlot.DOWN_0]: [6, 7], // 3
  },

  // 2
  [RoomShape.IH]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.RIGHT_0]: [13, 3], // 2
  },

  // 3
  [RoomShape.IV]: {
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.DOWN_0]: [6, 7], // 3
  },

  // 4
  [RoomShape.SHAPE_1x2]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [13, 3], // 2
    [DoorSlot.DOWN_0]: [6, 14], // 3
    [DoorSlot.LEFT_1]: [-1, 10], // 4
    [DoorSlot.RIGHT_1]: [13, 10], // 6
  },

  // 5
  [RoomShape.IIV]: {
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.DOWN_0]: [6, 14], // 3
  },

  // 6
  [RoomShape.SHAPE_2x1]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [26, 3], // 2
    [DoorSlot.DOWN_0]: [6, 7], // 3
    [DoorSlot.UP_1]: [19, -1], // 5
    [DoorSlot.DOWN_1]: [19, 7], // 7
  },

  // 7
  [RoomShape.IIH]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.RIGHT_0]: [26, 3], // 2
  },

  // 8
  [RoomShape.SHAPE_2x2]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [26, 3], // 2
    [DoorSlot.DOWN_0]: [6, 14], // 3
    [DoorSlot.LEFT_1]: [-1, 10], // 4
    [DoorSlot.UP_1]: [19, -1], // 5
    [DoorSlot.RIGHT_1]: [26, 10], // 6
    [DoorSlot.DOWN_1]: [19, 14], // 7
  },

  // 9
  [RoomShape.LTL]: {
    [DoorSlot.LEFT_0]: [12, 3], // 0
    [DoorSlot.UP_0]: [6, 6], // 1
    [DoorSlot.RIGHT_0]: [26, 3], // 2
    [DoorSlot.DOWN_0]: [6, 14], // 3
    [DoorSlot.LEFT_1]: [-1, 10], // 4
    [DoorSlot.UP_1]: [19, -1], // 5
    [DoorSlot.RIGHT_1]: [26, 10], // 6
    [DoorSlot.DOWN_1]: [19, 14], // 7
  },

  // 10
  [RoomShape.LTR]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [13, 3], // 2
    [DoorSlot.DOWN_0]: [6, 14], // 3
    [DoorSlot.LEFT_1]: [-1, 10], // 4
    [DoorSlot.UP_1]: [19, 6], // 5
    [DoorSlot.RIGHT_1]: [26, 10], // 6
    [DoorSlot.DOWN_1]: [19, 14], // 7
  },

  // 11
  [RoomShape.LBL]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [26, 3], // 2
    [DoorSlot.DOWN_0]: [6, 7], // 3
    [DoorSlot.LEFT_1]: [12, 10], // 4
    [DoorSlot.UP_1]: [19, -1], // 5
    [DoorSlot.RIGHT_1]: [26, 10], // 6
    [DoorSlot.DOWN_1]: [19, 14], // 7
  },

  // 12
  [RoomShape.LBR]: {
    [DoorSlot.LEFT_0]: [-1, 3], // 0
    [DoorSlot.UP_0]: [6, -1], // 1
    [DoorSlot.RIGHT_0]: [26, 3], // 2
    [DoorSlot.DOWN_0]: [6, 14], // 3
    [DoorSlot.LEFT_1]: [-1, 10], // 4
    [DoorSlot.UP_1]: [19, -1], // 5
    [DoorSlot.RIGHT_1]: [13, 10], // 6
    [DoorSlot.DOWN_1]: [19, 7], // 7
  },
} as const satisfies Record<
  RoomShape,
  Partial<Record<DoorSlot, readonly [x: int, y: int]>>
>;
