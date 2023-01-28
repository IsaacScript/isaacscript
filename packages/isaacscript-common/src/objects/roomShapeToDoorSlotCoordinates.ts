import { DoorSlot, RoomShape } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/**
 * The coordinates correspond to the x and y values that are present in a room's XML file.
 *
 * e.g. `<door exists="False" x="-1" y="3" />`
 */
// We need the tuples to be read-only, so we specify the type instead of using the `satisfies`
// operator.
export const ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES: {
  readonly [Key in RoomShape]: ReadonlyMap<DoorSlot, readonly [x: int, y: int]>;
} = {
  // 1
  [RoomShape.SHAPE_1x1]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [13, 3]], // 2
    [DoorSlot.DOWN_0, [6, 7]], // 3
  ]),

  // 2
  [RoomShape.IH]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.RIGHT_0, [13, 3]], // 2
  ]),

  // 3
  [RoomShape.IV]: new ReadonlyMap([
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.DOWN_0, [6, 7]], // 3
  ]),

  // 4
  [RoomShape.SHAPE_1x2]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [13, 3]], // 2
    [DoorSlot.DOWN_0, [6, 14]], // 3
    [DoorSlot.LEFT_1, [-1, 10]], // 4
    [DoorSlot.RIGHT_1, [13, 10]], // 6
  ]),

  // 5
  [RoomShape.IIV]: new ReadonlyMap([
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.DOWN_0, [6, 14]], // 3
  ]),

  // 6
  [RoomShape.SHAPE_2x1]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [26, 3]], // 2
    [DoorSlot.DOWN_0, [6, 7]], // 3
    [DoorSlot.UP_1, [19, -1]], // 5
    [DoorSlot.DOWN_1, [19, 7]], // 7
  ]),

  // 7
  [RoomShape.IIH]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.RIGHT_0, [26, 3]], // 2
  ]),

  // 8
  [RoomShape.SHAPE_2x2]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [26, 3]], // 2
    [DoorSlot.DOWN_0, [6, 14]], // 3
    [DoorSlot.LEFT_1, [-1, 10]], // 4
    [DoorSlot.UP_1, [19, -1]], // 5
    [DoorSlot.RIGHT_1, [26, 10]], // 6
    [DoorSlot.DOWN_1, [19, 14]], // 7
  ]),

  // 9
  [RoomShape.LTL]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [12, 3]], // 0
    [DoorSlot.UP_0, [6, 6]], // 1
    [DoorSlot.RIGHT_0, [26, 3]], // 2
    [DoorSlot.DOWN_0, [6, 14]], // 3
    [DoorSlot.LEFT_1, [-1, 10]], // 4
    [DoorSlot.UP_1, [19, -1]], // 5
    [DoorSlot.RIGHT_1, [26, 10]], // 6
    [DoorSlot.DOWN_1, [19, 14]], // 7
  ]),

  // 10
  [RoomShape.LTR]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [13, 3]], // 2
    [DoorSlot.DOWN_0, [6, 14]], // 3
    [DoorSlot.LEFT_1, [-1, 10]], // 4
    [DoorSlot.UP_1, [19, 6]], // 5
    [DoorSlot.RIGHT_1, [26, 10]], // 6
    [DoorSlot.DOWN_1, [19, 14]], // 7
  ]),

  // 11
  [RoomShape.LBL]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [26, 3]], // 2
    [DoorSlot.DOWN_0, [6, 7]], // 3
    [DoorSlot.LEFT_1, [12, 10]], // 4
    [DoorSlot.UP_1, [19, -1]], // 5
    [DoorSlot.RIGHT_1, [26, 10]], // 6
    [DoorSlot.DOWN_1, [19, 14]], // 7
  ]),

  // 12
  [RoomShape.LBR]: new ReadonlyMap([
    [DoorSlot.LEFT_0, [-1, 3]], // 0
    [DoorSlot.UP_0, [6, -1]], // 1
    [DoorSlot.RIGHT_0, [26, 3]], // 2
    [DoorSlot.DOWN_0, [6, 14]], // 3
    [DoorSlot.LEFT_1, [-1, 10]], // 4
    [DoorSlot.UP_1, [19, -1]], // 5
    [DoorSlot.RIGHT_1, [13, 10]], // 6
    [DoorSlot.DOWN_1, [19, 7]], // 7
  ]),
} as const;
