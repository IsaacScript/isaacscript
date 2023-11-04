/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename DisplayFlag
 */
const DisplayFlagInternal = {
  /** 1 << -1 (0) */
  INVISIBLE: 1 << -1,

  /** 1 << 0 (1) */
  VISIBLE: 1 << 0,

  /** 1 << 1 (2) */
  SHADOW: 1 << 1,

  /** 1 << 2 (4) */
  SHOW_ICON: 1 << 2,
} as const;

type DisplayFlagValue = BitFlag & {
  readonly __displayFlagBrand: symbol;
};
type DisplayFlagType = {
  readonly [K in keyof typeof DisplayFlagInternal]: DisplayFlagValue;
};

export const DisplayFlag = DisplayFlagInternal as DisplayFlagType;
export type DisplayFlag = DisplayFlagType[keyof DisplayFlagType];

export const DisplayFlagZero = 0 as BitFlags<DisplayFlag>;
