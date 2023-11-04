import { DoorSlot, DoorSlotFlag } from "isaac-typescript-definitions";

export const DEFAULT_DOOR_SLOT = DoorSlot.NO_DOOR_SLOT;

export const DOOR_SLOT_FLAG_TO_DOOR_SLOT = {
  [DoorSlotFlag.LEFT_0]: DoorSlot.LEFT_0, // 0
  [DoorSlotFlag.UP_0]: DoorSlot.UP_0, // 1
  [DoorSlotFlag.RIGHT_0]: DoorSlot.RIGHT_0, // 2
  [DoorSlotFlag.DOWN_0]: DoorSlot.DOWN_0, // 3
  [DoorSlotFlag.LEFT_1]: DoorSlot.LEFT_1, // 4
  [DoorSlotFlag.UP_1]: DoorSlot.UP_1, // 5
  [DoorSlotFlag.RIGHT_1]: DoorSlot.RIGHT_1, // 6
  [DoorSlotFlag.DOWN_1]: DoorSlot.DOWN_1, // 7
} as const satisfies Record<DoorSlotFlag, DoorSlot>;
