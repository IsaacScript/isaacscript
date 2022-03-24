import { LEVEL_GRID_ROW_LENGTH } from "../constants";

const LEFT = -1;
const UP = -LEVEL_GRID_ROW_LENGTH;
const RIGHT = 1;
const DOWN = LEVEL_GRID_ROW_LENGTH;

/**
 * Deltas are considered to be from the safe grid index of the room (i.e. the top left corner, or
 * top right corner in the case of `RoomShape.ROOMSHAPE_LTL`).
 */
export const ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA: {
  readonly [key in RoomShape]: Map<DoorSlot, int> | undefined;
} = {
  // 1
  [RoomShape.ROOMSHAPE_1x1]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT], // 2
    [DoorSlot.DOWN0, DOWN], // 3
  ]),

  // 2
  [RoomShape.ROOMSHAPE_IH]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.RIGHT0, RIGHT], // 2
  ]),

  // 3
  [RoomShape.ROOMSHAPE_IV]: new Map([
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.DOWN0, DOWN], // 3
  ]),

  // 4
  [RoomShape.ROOMSHAPE_1x2]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT], // 2
    [DoorSlot.DOWN0, DOWN + DOWN], // 3
    [DoorSlot.LEFT1, DOWN + LEFT], // 4
    [DoorSlot.RIGHT1, DOWN + RIGHT], // 6
  ]),

  // 5
  [RoomShape.ROOMSHAPE_IIV]: new Map([
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.DOWN0, DOWN + DOWN], // 3
  ]),

  // 6
  [RoomShape.ROOMSHAPE_2x1]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN0, DOWN], // 3
    [DoorSlot.UP1, RIGHT + UP], // 5
    [DoorSlot.DOWN1, RIGHT + DOWN], // 7
  ]),

  // 7
  [RoomShape.ROOMSHAPE_IIH]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.RIGHT0, RIGHT + RIGHT], // 2
  ]),

  // 8
  [RoomShape.ROOMSHAPE_2x2]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN0, DOWN + DOWN], // 3
    [DoorSlot.LEFT1, DOWN + LEFT], // 4
    [DoorSlot.UP1, RIGHT + UP], // 5
    [DoorSlot.RIGHT1, RIGHT + DOWN + RIGHT], // 6
    [DoorSlot.DOWN1, RIGHT + DOWN + DOWN], // 7
  ]),

  // 9
  [RoomShape.ROOMSHAPE_LTL]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, DOWN + LEFT + UP], // 1
    [DoorSlot.RIGHT0, RIGHT], // 2
    [DoorSlot.DOWN0, DOWN + LEFT + DOWN], // 3
    [DoorSlot.LEFT1, DOWN + LEFT + LEFT], // 4
    [DoorSlot.UP1, UP], // 5
    [DoorSlot.RIGHT1, DOWN + RIGHT], // 6
    [DoorSlot.DOWN1, DOWN + DOWN], // 7
  ]),

  // 10
  [RoomShape.ROOMSHAPE_LTR]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT], // 2
    [DoorSlot.DOWN0, DOWN + DOWN], // 3
    [DoorSlot.LEFT1, DOWN + LEFT], // 4
    [DoorSlot.UP1, DOWN + RIGHT + UP], // 5
    [DoorSlot.RIGHT1, DOWN + RIGHT + RIGHT], // 6
    [DoorSlot.DOWN1, DOWN + RIGHT + DOWN], // 7
  ]),

  // 11
  [RoomShape.ROOMSHAPE_LBL]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN0, DOWN], // 3
    [DoorSlot.LEFT1, RIGHT + DOWN + LEFT], // 4
    [DoorSlot.UP1, RIGHT + UP], // 5
    [DoorSlot.RIGHT1, RIGHT + DOWN + RIGHT], // 6
    [DoorSlot.DOWN1, RIGHT + DOWN + DOWN], // 7
  ]),

  // 12
  [RoomShape.ROOMSHAPE_LBR]: new Map([
    [DoorSlot.LEFT0, LEFT], // 0
    [DoorSlot.UP0, UP], // 1
    [DoorSlot.RIGHT0, RIGHT + RIGHT], // 2
    [DoorSlot.DOWN0, DOWN + DOWN], // 3
    [DoorSlot.LEFT1, DOWN + LEFT], // 4
    [DoorSlot.UP1, RIGHT + UP], // 5
    [DoorSlot.RIGHT1, DOWN + RIGHT], // 6
    [DoorSlot.DOWN1, RIGHT + DOWN], // 7
  ]),

  // 13
  [RoomShape.NUM_ROOMSHAPES]: undefined,
};
