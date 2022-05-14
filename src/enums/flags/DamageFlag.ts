const DamageFlagInternal = {
  /** 1 << 0 */
  NO_KILL: 1 << 0,

  /** 1 << 1 */
  FIRE: 1 << 1,

  /** 1 << 2 */
  EXPLOSION: 1 << 2,

  /** 1 << 3 */
  LASER: 1 << 3,

  /** 1 << 4 */
  ACID: 1 << 4,

  /** 1 << 5 */
  RED_HEARTS: 1 << 5,

  /** 1 << 6 */
  COUNTDOWN: 1 << 6,

  /** 1 << 7 */
  SPIKES: 1 << 7,

  /** 1 << 8 */
  CLONES: 1 << 8,

  /** 1 << 9 */
  POOP: 1 << 9,

  /** 1 << 10 */
  DEVIL: 1 << 10,

  /** 1 << 11 */
  ISSAC_HEART: 1 << 11,

  /** 1 << 12 */
  TNT: 1 << 12,

  /** 1 << 13 */
  INVINCIBLE: 1 << 13,

  /** 1 << 14 */
  SPAWN_FLY: 1 << 14,

  /** 1 << 15 */
  POISON_BURN: 1 << 15,

  /** 1 << 16 */
  CURSED_DOOR: 1 << 16,

  /** 1 << 17 */
  TIMER: 1 << 17,

  /** 1 << 18 */
  IV_BAG: 1 << 18,

  /** 1 << 19 */
  PITFALL: 1 << 19,

  /** 1 << 20 */
  CHEST: 1 << 20,

  /** 1 << 21 */
  FAKE: 1 << 21,

  /** 1 << 22 */
  BOOGER: 1 << 22,

  /** 1 << 23 */
  SPAWN_BLACK_HEART: 1 << 23,

  /** 1 << 24 */
  CRUSH: 1 << 24,

  /** 1 << 25 */
  NO_MODIFIERS: 1 << 25,

  /** 1 << 26 */
  SPAWN_RED_HEART: 1 << 26,

  /** 1 << 27 */
  SPAWN_COIN: 1 << 27,

  /** 1 << 28 */
  NO_PENALTIES: 1 << 28,

  /** 1 << 29 */
  SPAWN_TEMP_HEART: 1 << 29,

  /** 1 << 30 */
  IGNORE_ARMOR: 1 << 30,

  /** 1 << 31 */
  SPAWN_CARD: 1 << 31,

  /** 1 << 32 */
  SPAWN_RUNE: 1 << 32,
};

type DamageFlagValue = number & {
  readonly __bitFlagBrand: void;
  readonly __damageFlagBrand: void;
};
type DamageFlagType = {
  [K in keyof typeof DamageFlagInternal]: DamageFlagValue;
};

export const DamageFlag = DamageFlagInternal as DamageFlagType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DamageFlag = DamageFlagType[keyof DamageFlagType];
