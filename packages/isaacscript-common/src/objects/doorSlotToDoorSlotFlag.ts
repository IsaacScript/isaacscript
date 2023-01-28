import {
  DoorSlot,
  DoorSlotFlag,
  DoorSlotFlagZero,
} from "isaac-typescript-definitions";

export const DOOR_SLOT_TO_DOOR_SLOT_FLAG = {
  [DoorSlot.NO_DOOR_SLOT]: DoorSlotFlagZero, // -1
  [DoorSlot.LEFT_0]: DoorSlotFlag.LEFT_0, // 0
  [DoorSlot.UP_0]: DoorSlotFlag.UP_0, // 1
  [DoorSlot.RIGHT_0]: DoorSlotFlag.RIGHT_0, // 2
  [DoorSlot.DOWN_0]: DoorSlotFlag.DOWN_0, // 3
  [DoorSlot.LEFT_1]: DoorSlotFlag.LEFT_1, // 4
  [DoorSlot.UP_1]: DoorSlotFlag.UP_1, // 5
  [DoorSlot.RIGHT_1]: DoorSlotFlag.RIGHT_1, // 6
  [DoorSlot.DOWN_1]: DoorSlotFlag.DOWN_1, // 7
} as const satisfies Record<DoorSlot, DoorSlotFlag>;
