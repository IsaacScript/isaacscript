import { DoorSlot } from "isaac-typescript-definitions";

export const OPPOSITE_DOOR_SLOTS = {
  [DoorSlot.NO_DOOR_SLOT]: undefined, // -1
  [DoorSlot.LEFT_0]: DoorSlot.RIGHT_0, // 0
  [DoorSlot.UP_0]: DoorSlot.DOWN_0, // 1
  [DoorSlot.RIGHT_0]: DoorSlot.LEFT_0, // 2
  [DoorSlot.DOWN_0]: DoorSlot.UP_0, // 3
  [DoorSlot.LEFT_1]: DoorSlot.RIGHT_1, // 4
  [DoorSlot.UP_1]: DoorSlot.DOWN_1, // 5
  [DoorSlot.RIGHT_1]: DoorSlot.LEFT_1, // 6
  [DoorSlot.DOWN_1]: DoorSlot.UP_1, // 7
} as const satisfies Record<DoorSlot, DoorSlot | undefined>;
