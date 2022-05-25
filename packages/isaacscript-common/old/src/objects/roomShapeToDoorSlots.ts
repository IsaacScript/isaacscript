import { DoorSlot, RoomShape } from "isaac-typescript-definitions";

const ALL_DOOR_SLOTS_SET: ReadonlySet<DoorSlot> = new Set([
  DoorSlot.LEFT_0, // 0
  DoorSlot.UP_0, // 1
  DoorSlot.RIGHT_0, // 2
  DoorSlot.DOWN_0, // 3
  DoorSlot.LEFT_1, // 4
  DoorSlot.UP_1, // 5
  DoorSlot.RIGHT_1, // 6
  DoorSlot.DOWN_1, // 7
]);

export const ROOM_SHAPE_TO_DOOR_SLOTS: {
  readonly [key in RoomShape]: ReadonlySet<DoorSlot>;
} = {
  // 1
  [RoomShape.SHAPE_1x1]: new Set([
    DoorSlot.LEFT_0, // 0
    DoorSlot.UP_0, // 1
    DoorSlot.RIGHT_0, // 2
    DoorSlot.DOWN_0, // 3
  ]),

  // 2
  [RoomShape.IH]: new Set([
    DoorSlot.LEFT_0, // 0
    DoorSlot.RIGHT_0, // 2
  ]),

  // 3
  [RoomShape.IV]: new Set([
    DoorSlot.UP_0, // 1
    DoorSlot.DOWN_0, // 3
  ]),

  // 4
  [RoomShape.SHAPE_1x2]: new Set([
    DoorSlot.LEFT_0, // 0
    DoorSlot.UP_0, // 1
    DoorSlot.RIGHT_0, // 2
    DoorSlot.DOWN_0, // 3
    DoorSlot.LEFT_1, // 4
    DoorSlot.RIGHT_1, // 6
  ]),

  // 5
  [RoomShape.IIV]: new Set([
    DoorSlot.UP_0, // 1
    DoorSlot.DOWN_0, // 3
  ]),

  // 6
  [RoomShape.SHAPE_2x1]: new Set([
    DoorSlot.LEFT_0, // 0
    DoorSlot.UP_0, // 1
    DoorSlot.RIGHT_0, // 2
    DoorSlot.DOWN_0, // 3
    DoorSlot.UP_1, // 5
    DoorSlot.DOWN_1, // 7
  ]),

  // 7
  [RoomShape.IIH]: new Set([
    DoorSlot.LEFT_0, // 0
    DoorSlot.RIGHT_0, // 2
  ]),

  // 8
  [RoomShape.SHAPE_2x2]: ALL_DOOR_SLOTS_SET,

  // 9
  [RoomShape.LTL]: ALL_DOOR_SLOTS_SET,

  // 10
  [RoomShape.LTR]: ALL_DOOR_SLOTS_SET,

  // 11
  [RoomShape.LBL]: ALL_DOOR_SLOTS_SET,

  // 12
  [RoomShape.LBR]: ALL_DOOR_SLOTS_SET,
};
