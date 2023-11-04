/**
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename DamageFlag
 */
const DamageFlagInternal = {
  /** 1 << 0 (1) */
  NO_KILL: 1 << 0,

  /**
   * e.g. fireplace
   *
   * 1 << 1 (2)
   */
  FIRE: 1 << 1,

  /** 1 << 2 (4) */
  EXPLOSION: 1 << 2,

  /** 1 << 3 (8) */
  LASER: 1 << 3,

  /** 1 << 4 (16) */
  ACID: 1 << 4,

  /** 1 << 5 (32) */
  RED_HEARTS: 1 << 5,

  /** 1 << 6 (64) */
  COUNTDOWN: 1 << 6,

  /** 1 << 7 (128) */
  SPIKES: 1 << 7,

  /** 1 << 8 (256) */
  CLONES: 1 << 8,

  /** 1 << 9 (512) */
  POOP: 1 << 9,

  /** 1 << 10 (1024) */
  DEVIL: 1 << 10,

  /** 1 << 11 (2048) */
  ISSAC_HEART: 1 << 11,

  /** 1 << 12 (4096) */
  TNT: 1 << 12,

  /** 1 << 13 (8192) */
  INVINCIBLE: 1 << 13,

  /** 1 << 14 (16384) */
  SPAWN_FLY: 1 << 14,

  /** 1 << 15 (32768) */
  POISON_BURN: 1 << 15,

  /** 1 << 16 (65536) */
  CURSED_DOOR: 1 << 16,

  /** 1 << 17 (131072) */
  TIMER: 1 << 17,

  /** 1 << 18 (262144) */
  IV_BAG: 1 << 18,

  /** 1 << 19 (524288) */
  PITFALL: 1 << 19,

  /** 1 << 20 (1048576) */
  CHEST: 1 << 20,

  /** 1 << 21 (2097152) */
  FAKE: 1 << 21,

  /** 1 << 22 (4194304) */
  BOOGER: 1 << 22,

  /** 1 << 23 (8388608) */
  SPAWN_BLACK_HEART: 1 << 23,

  /**
   * Comes from a strong impact. Can damage Tuff Twins or The Shell (e.g. Mom's foot, shockwaves,
   * rock tears).
   *
   * 1 << 24 (16777216)
   */
  CRUSH: 1 << 24,

  /** 1 << 25 (33554432) */
  NO_MODIFIERS: 1 << 25,

  /** 1 << 26 (67108864) */
  SPAWN_RED_HEART: 1 << 26,

  /** 1 << 27 (134217728) */
  SPAWN_COIN: 1 << 27,

  /** 1 << 28 (268435456) */
  NO_PENALTIES: 1 << 28,

  /** 1 << 29 (536870912) */
  SPAWN_TEMP_HEART: 1 << 29,

  /** 1 << 30 (1073741824) */
  IGNORE_ARMOR: 1 << 30,

  /** 1 << 31 (2147483648) */
  SPAWN_CARD: 1 << 31,

  /** 1 << 32 (4294967296) */
  SPAWN_RUNE: 1 << 32,
} as const;

type DamageFlagValue = BitFlag & {
  readonly __damageFlagBrand: symbol;
};
type DamageFlagType = {
  readonly [K in keyof typeof DamageFlagInternal]: DamageFlagValue;
};

export const DamageFlag = DamageFlagInternal as DamageFlagType;
export type DamageFlag = DamageFlagType[keyof DamageFlagType];

export const DamageFlagZero = 0 as BitFlags<DamageFlag>;
