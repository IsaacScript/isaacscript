const ALL_DOOR_SLOTS_SET: ReadonlySet<DoorSlot> = new Set([
  DoorSlot.LEFT0, // 0
  DoorSlot.UP0, // 1
  DoorSlot.RIGHT0, // 2
  DoorSlot.DOWN0, // 3
  DoorSlot.LEFT1, // 4
  DoorSlot.UP1, // 5
  DoorSlot.RIGHT1, // 6
  DoorSlot.DOWN1, // 7
]);

export const ROOM_SHAPE_TO_DOOR_SLOTS: {
  readonly [key in RoomShape]: ReadonlySet<DoorSlot>;
} = {
  // 1
  [RoomShape.ROOMSHAPE_1x1]: new Set([
    DoorSlot.LEFT0, // 0
    DoorSlot.UP0, // 1
    DoorSlot.RIGHT0, // 2
    DoorSlot.DOWN0, // 3
  ]),

  // 2
  [RoomShape.ROOMSHAPE_IH]: new Set([
    DoorSlot.LEFT0, // 0
    DoorSlot.RIGHT0, // 2
  ]),

  // 3
  [RoomShape.ROOMSHAPE_IV]: new Set([
    DoorSlot.UP0, // 1
    DoorSlot.DOWN0, // 3
  ]),

  // 4
  [RoomShape.ROOMSHAPE_1x2]: new Set([
    DoorSlot.LEFT0, // 0
    DoorSlot.UP0, // 1
    DoorSlot.RIGHT0, // 2
    DoorSlot.DOWN0, // 3
    DoorSlot.LEFT1, // 4
    DoorSlot.RIGHT1, // 6
  ]),

  // 5
  [RoomShape.ROOMSHAPE_IIV]: new Set([
    DoorSlot.UP0, // 1
    DoorSlot.DOWN0, // 3
  ]),

  // 6
  [RoomShape.ROOMSHAPE_2x1]: new Set([
    DoorSlot.LEFT0, // 0
    DoorSlot.UP0, // 1
    DoorSlot.RIGHT0, // 2
    DoorSlot.DOWN0, // 3
    DoorSlot.UP1, // 5
    DoorSlot.DOWN1, // 7
  ]),

  // 7
  [RoomShape.ROOMSHAPE_IIH]: new Set([
    DoorSlot.LEFT0, // 0
    DoorSlot.RIGHT0, // 2
  ]),

  // 8
  [RoomShape.ROOMSHAPE_2x2]: ALL_DOOR_SLOTS_SET,

  // 9
  [RoomShape.ROOMSHAPE_LTL]: ALL_DOOR_SLOTS_SET,

  // 10
  [RoomShape.ROOMSHAPE_LTR]: ALL_DOOR_SLOTS_SET,

  // 11
  [RoomShape.ROOMSHAPE_LBL]: ALL_DOOR_SLOTS_SET,

  // 12
  [RoomShape.ROOMSHAPE_LBR]: ALL_DOOR_SLOTS_SET,

  // 13
  [RoomShape.NUM_ROOMSHAPES]: new Set(),
};
