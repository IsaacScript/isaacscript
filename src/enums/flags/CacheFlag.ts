const CacheFlagInternal = {
  /** 1 << 0 */
  DAMAGE: 1 << 0,

  /** 1 << 1 */
  FIRE_DELAY: 1 << 1,

  /** 1 << 2 */
  SHOT_SPEED: 1 << 2,

  /** 1 << 3 */
  RANGE: 1 << 3,

  /** 1 << 4 */
  SPEED: 1 << 4,

  /** 1 << 5 */
  TEAR_FLAG: 1 << 5,

  /** 1 << 6 */
  TEAR_COLOR: 1 << 6,

  /** 1 << 7 */
  FLYING: 1 << 7,

  /** 1 << 8 */
  WEAPON: 1 << 8,

  /** 1 << 9 */
  FAMILIARS: 1 << 9,

  /** 1 << 10 */
  LUCK: 1 << 10,

  /** 1 << 11 */
  SIZE: 1 << 11,

  /** 1 << 12 */
  COLOR: 1 << 12,

  /** 1 << 13 */
  PICKUP_VISION: 1 << 13,

  /** (1 << 16) - 1 */
  ALL: (1 << 16) - 1,

  /** 1 << 31 */
  TWIN_SYNC: 1 << 31,
} as const;

type CacheFlagValue = number & {
  readonly __bitFlagBrand: void;
  readonly __cacheFlagBrand: void;
};
type CacheFlagType = {
  [K in keyof typeof CacheFlagInternal]: CacheFlagValue;
};

export const CacheFlag = CacheFlagInternal as CacheFlagType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type CacheFlag = CacheFlagType[keyof CacheFlagType];
