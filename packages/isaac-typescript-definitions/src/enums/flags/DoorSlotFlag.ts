import { DoorSlot } from "../DoorSlot";

/**
 * For `GridEntityType.DOOR` (16).
 *
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename DoorSlotFlag
 */
const DoorSlotFlagInternal = {
  /** 1 << 0 (1) */
  LEFT_0: 1 << DoorSlot.LEFT_0,

  /** 1 << 1 (2) */
  UP_0: 1 << DoorSlot.UP_0,

  /** 1 << 2 (4) */
  RIGHT_0: 1 << DoorSlot.RIGHT_0,

  /** 1 << 3 (8) */
  DOWN_0: 1 << DoorSlot.DOWN_0,

  /** 1 << 4 (16) */
  LEFT_1: 1 << DoorSlot.LEFT_1,

  /** 1 << 5 (32) */
  UP_1: 1 << DoorSlot.UP_1,

  /** 1 << 6 (64) */
  RIGHT_1: 1 << DoorSlot.RIGHT_1,

  /** 1 << 7 (128) */
  DOWN_1: 1 << DoorSlot.DOWN_1,
} as const;

type DoorSlotFlagValue = BitFlag & {
  readonly __doorSlotFlagBrand: symbol;
};
type DoorSlotFlagType = {
  readonly [K in keyof typeof DoorSlotFlagInternal]: DoorSlotFlagValue;
};

export const DoorSlotFlag = DoorSlotFlagInternal as DoorSlotFlagType;
export type DoorSlotFlag = DoorSlotFlagType[keyof DoorSlotFlagType];

export const DoorSlotFlagZero = 0 as BitFlags<DoorSlotFlag>;
