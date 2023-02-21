/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename CacheFlag
 */
const CacheFlagInternal = {
  /** 1 << 0 (1) */
  DAMAGE: 1 << 0,

  /** 1 << 1 (2) */
  FIRE_DELAY: 1 << 1,

  /** 1 << 2 (4) */
  SHOT_SPEED: 1 << 2,

  /** 1 << 3 (8) */
  RANGE: 1 << 3,

  /** 1 << 4 (16) */
  SPEED: 1 << 4,

  /** 1 << 5 (32) */
  TEAR_FLAG: 1 << 5,

  /** 1 << 6 (64) */
  TEAR_COLOR: 1 << 6,

  /** 1 << 7 (128) */
  FLYING: 1 << 7,

  /** 1 << 8 (256) */
  WEAPON: 1 << 8,

  /** 1 << 9 (512) */
  FAMILIARS: 1 << 9,

  /** 1 << 10 (1024) */
  LUCK: 1 << 10,

  /** 1 << 11 (2048) */
  SIZE: 1 << 11,

  /** 1 << 12 (4096) */
  COLOR: 1 << 12,

  /** 1 << 13 (8192) */
  PICKUP_VISION: 1 << 13,

  /** (1 << 16) - 1 */
  ALL: (1 << 16) - 1,

  /** 1 << 31 (2147483648) */
  TWIN_SYNC: 1 << 31,
} as const;

type CacheFlagValue = BitFlag & {
  readonly __cacheFlagBrand: symbol;
};
type CacheFlagType = {
  readonly [K in keyof typeof CacheFlagInternal]: CacheFlagValue;
};

export const CacheFlag = CacheFlagInternal as CacheFlagType;
export type CacheFlag = CacheFlagType[keyof CacheFlagType];

export const CacheFlagZero = 0 as BitFlags<CacheFlag>;
