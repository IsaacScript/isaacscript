/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename ActionTrigger
 */
const ActionTriggerInternal = {
  /** 1 << -1 (0) */
  NONE: 1 << -1,

  /** 1 << 0 (1) */
  BOMB_PLACED: 1 << 0,

  /** 1 << 1 (2) */
  MOVED: 1 << 1,

  /** 1 << 2 (4) */
  SHOOTING: 1 << 2,

  /** 1 << 3 (8) */
  CARD_PILL_USED: 1 << 3,

  /** 1 << 4 (16) */
  ITEM_ACTIVATED: 1 << 4,

  /** 1 << 5 (32) */
  ITEMS_DROPPED: 1 << 5,
} as const;

type ActionTriggerValue = BitFlag & {
  readonly __actionTriggerBrand: symbol;
};
type ActionTriggerType = {
  readonly [K in keyof typeof ActionTriggerInternal]: ActionTriggerValue;
};

export const ActionTrigger = ActionTriggerInternal as ActionTriggerType;
export type ActionTrigger = ActionTriggerType[keyof ActionTriggerType];

export const ActionTriggerZero = 0 as BitFlags<ActionTrigger>;
