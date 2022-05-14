const DisplayFlagInternal = {
  /** 1 << -1 */
  INVISIBLE: 1 << -1,

  /** 1 << 0 */
  VISIBLE: 1 << 0,

  /** 1 << 1 */
  SHADOW: 1 << 1,

  /** 1 << 2 */
  SHOW_ICON: 1 << 2,
} as const;

type DisplayFlagValue = number & {
  readonly __bitFlagBrand: void;
  readonly __displayFlagBrand: void;
};
type DisplayFlagType = {
  [K in keyof typeof DisplayFlagInternal]: DisplayFlagValue;
};

export const DisplayFlag = DisplayFlagInternal as DisplayFlagType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DisplayFlag = DisplayFlagType[keyof DisplayFlagType];
