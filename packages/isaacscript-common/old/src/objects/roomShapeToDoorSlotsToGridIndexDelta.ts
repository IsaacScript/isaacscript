import { DoorSlot, RoomShape } from "isaac-typescript-definitions";
import { LEVEL_GRID_ROW_WIDTH } from "../constants";

const LEFT = -1;
const UP = -LEVEL_GRID_ROW_WIDTH;
const RIGHT = 1;
const DOWN = LEVEL_GRID_ROW_WIDTH;

/**
 * Deltas are considered to be from the safe grid index of the room (i.e. the top left corner, or
 * top right corner in the case of `RoomShape.LTL`).
 */
export const ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA: {
  readonly [key in RoomShape]: Map<DoorSlot, int>;
} = {
  // 1
  [RoomShape.SHAPE_1x1]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN], // 3
  ]),

  // 2
  [RoomShape.IH]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.RIGHT_0, RIGHT], // 2
  ]),

  // 3
  [RoomShape.IV]: new Map([
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.DOWN_0, DOWN], // 3
  ]),

  // 4
  [RoomShape.SHAPE_1x2]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN + DOWN], // 3
    [DoorSlot.LEFT_1, DOWN + LEFT], // 4
    [DoorSlot.RIGHT_1, DOWN + RIGHT], // 6
  ]),

  // 5
  [RoomShape.IIV]: new Map([
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.DOWN_0, DOWN + DOWN], // 3
  ]),

  // 6
  [RoomShape.SHAPE_2x1]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN], // 3
    [DoorSlot.UP_1, RIGHT + UP], // 5
    [DoorSlot.DOWN_1, RIGHT + DOWN], // 7
  ]),

  // 7
  [RoomShape.IIH]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.RIGHT_0, RIGHT + RIGHT], // 2
  ]),

  // 8
  [RoomShape.SHAPE_2x2]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN + DOWN], // 3
    [DoorSlot.LEFT_1, DOWN + LEFT], // 4
    [DoorSlot.UP_1, RIGHT + UP], // 5
    [DoorSlot.RIGHT_1, RIGHT + DOWN + RIGHT], // 6
    [DoorSlot.DOWN_1, RIGHT + DOWN + DOWN], // 7
  ]),

  // 9
  [RoomShape.LTL]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, DOWN + LEFT + UP], // 1
    [DoorSlot.RIGHT_0, RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN + LEFT + DOWN], // 3
    [DoorSlot.LEFT_1, DOWN + LEFT + LEFT], // 4
    [DoorSlot.UP_1, UP], // 5
    [DoorSlot.RIGHT_1, DOWN + RIGHT], // 6
    [DoorSlot.DOWN_1, DOWN + DOWN], // 7
  ]),

  // 10
  [RoomShape.LTR]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN + DOWN], // 3
    [DoorSlot.LEFT_1, DOWN + LEFT], // 4
    [DoorSlot.UP_1, DOWN + RIGHT + UP], // 5
    [DoorSlot.RIGHT_1, DOWN + RIGHT + RIGHT], // 6
    [DoorSlot.DOWN_1, DOWN + RIGHT + DOWN], // 7
  ]),

  // 11
  [RoomShape.LBL]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN], // 3
    [DoorSlot.LEFT_1, RIGHT + DOWN + LEFT], // 4
    [DoorSlot.UP_1, RIGHT + UP], // 5
    [DoorSlot.RIGHT_1, RIGHT + DOWN + RIGHT], // 6
    [DoorSlot.DOWN_1, RIGHT + DOWN + DOWN], // 7
  ]),

  // 12
  [RoomShape.LBR]: new Map([
    [DoorSlot.LEFT_0, LEFT], // 0
    [DoorSlot.UP_0, UP], // 1
    [DoorSlot.RIGHT_0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN_0, DOWN + DOWN], // 3
    [DoorSlot.LEFT_1, DOWN + LEFT], // 4
    [DoorSlot.UP_1, RIGHT + UP], // 5
    [DoorSlot.RIGHT_1, DOWN + RIGHT], // 6
    [DoorSlot.DOWN_1, RIGHT + DOWN], // 7
  ]),
};
