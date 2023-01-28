import { Direction, DoorSlot } from "isaac-typescript-definitions";

export const DOOR_SLOT_TO_DIRECTION = {
  [DoorSlot.NO_DOOR_SLOT]: Direction.NO_DIRECTION, // -1
  [DoorSlot.LEFT_0]: Direction.LEFT, // 0
  [DoorSlot.UP_0]: Direction.UP, // 1
  [DoorSlot.RIGHT_0]: Direction.RIGHT, // 2
  [DoorSlot.DOWN_0]: Direction.DOWN, // 3
  [DoorSlot.LEFT_1]: Direction.LEFT, // 4
  [DoorSlot.UP_1]: Direction.UP, // 5
  [DoorSlot.RIGHT_1]: Direction.RIGHT, // 6
  [DoorSlot.DOWN_1]: Direction.DOWN, // 7
} as const satisfies Record<DoorSlot, Direction>;
