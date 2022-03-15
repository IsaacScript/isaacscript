export const DOOR_SLOT_TO_DIRECTION: { readonly [key in DoorSlot]: Direction } =
  {
    [DoorSlot.NO_DOOR_SLOT]: Direction.NO_DIRECTION, // -1
    [DoorSlot.LEFT0]: Direction.LEFT, // 0
    [DoorSlot.UP0]: Direction.UP, // 1
    [DoorSlot.RIGHT0]: Direction.RIGHT, // 2
    [DoorSlot.DOWN0]: Direction.DOWN, // 3
    [DoorSlot.LEFT1]: Direction.LEFT, // 4
    [DoorSlot.UP1]: Direction.UP, // 5
    [DoorSlot.RIGHT1]: Direction.RIGHT, // 6
    [DoorSlot.DOWN1]: Direction.DOWN, // 7
    [DoorSlot.NUM_DOOR_SLOTS]: Direction.NO_DIRECTION, // 8
  };
