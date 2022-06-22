import { DoorSlot } from "isaac-typescript-definitions";

export const OPPOSITE_DOOR_SLOTS: {
  readonly [key in DoorSlot]: DoorSlot | undefined;
} = {
  [DoorSlot.NO_DOOR_SLOT]: undefined,
  [DoorSlot.LEFT_0]: DoorSlot.RIGHT_0,
  [DoorSlot.UP_0]: DoorSlot.DOWN_0,
  [DoorSlot.RIGHT_0]: DoorSlot.LEFT_0,
  [DoorSlot.LEFT_1]: DoorSlot.RIGHT_1,
  [DoorSlot.DOWN_0]: DoorSlot.UP_0,
  [DoorSlot.UP_1]: DoorSlot.DOWN_1,
  [DoorSlot.RIGHT_1]: DoorSlot.LEFT_1,
  [DoorSlot.DOWN_1]: DoorSlot.UP_1,
} as const;
