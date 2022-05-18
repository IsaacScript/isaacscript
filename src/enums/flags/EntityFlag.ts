/**
 * This is an object instead of a TypeScript enum because we need to specify that it contains bit
 * flags.
 */
const EntityFlagInternal = {
  /** 1 << 0 */
  NO_STATUS_EFFECTS: 1 << 0,

  /** 1 << 1 */
  NO_INTERPOLATE: 1 << 1,

  /** 1 << 2 */
  APPEAR: 1 << 2,

  /** 1 << 3 */
  RENDER_FLOOR: 1 << 3,

  /** 1 << 4 */
  NO_TARGET: 1 << 4,

  /** 1 << 5 */
  FREEZE: 1 << 5,

  /** 1 << 6 */
  POISON: 1 << 6,

  /** 1 << 7 */
  SLOW: 1 << 7,

  /** 1 << 8 */
  CHARM: 1 << 8,

  /** 1 << 9 */
  CONFUSION: 1 << 9,

  /** 1 << 10 */
  MIDAS_FREEZE: 1 << 10,

  /** 1 << 11 */
  FEAR: 1 << 11,

  /** 1 << 12 */
  BURN: 1 << 12,

  /** 1 << 13 */
  RENDER_WALL: 1 << 13,

  /** 1 << 14 */
  INTERPOLATION_UPDATE: 1 << 14,

  /** 1 << 15 */
  APPLY_GRAVITY: 1 << 15,

  /** 1 << 16 */
  NO_BLOOD_SPLASH: 1 << 16,

  /** 1 << 17 */
  NO_REMOVE_ON_TEX_RENDER: 1 << 17,

  /** 1 << 18 */
  NO_DEATH_TRIGGER: 1 << 18,

  /**
   * This shares the same value as `FLAG_LASER_POP` and `FLAG_ITEM_SHOULD_DUPLICATE`, but has a
   * different meaning depending on the entity type.
   *
   * 1 << 19
   */
  NO_SPIKE_DAMAGE: 1 << 19,

  /**
   * This shares the same value as `FLAG_NO_SPIKE_DAMAGE` and `FLAG_ITEM_SHOULD_DUPLICATE`, but has
   * a different meaning depending on the entity type.
   *
   * 1 << 19
   */
  LASER_POP: 1 << 19,

  /**
   * This shares the same value as `FLAG_NO_SPIKE_DAMAGE` and `FLAG_LASER_POP`, but has a different
   * meaning depending on the entity type.
   *
   * 1 << 19
   */
  ITEM_SHOULD_DUPLICATE: 1 << 19,

  /** 1 << 20 */
  BOSS_DEATH_TRIGGERED: 1 << 20,

  /** 1 << 21 */
  DONT_OVERWRITE: 1 << 21,

  /** 1 << 22 */
  SPAWN_STICKY_SPIDERS: 1 << 22,

  /** 1 << 23 */
  SPAWN_BLACK_HP: 1 << 23,

  /** 1 << 24 */
  SHRINK: 1 << 24,

  /** 1 << 25 */
  NO_FLASH_ON_DAMAGE: 1 << 25,

  /** 1 << 26 */
  NO_KNOCKBACK: 1 << 26,

  /** 1 << 27 */
  SLIPPERY_PHYSICS: 1 << 27,

  /** 1 << 28 */
  ADD_JAR_FLY: 1 << 28,

  /** 1 << 29 */
  FRIENDLY: 1 << 29,

  /** 1 << 30 */
  NO_PHYSICS_KNOCKBACK: 1 << 30,

  /** 1 << 31 */
  DONT_COUNT_BOSS_HP: 1 << 31,

  /** 1 << 32 */
  NO_SPRITE_UPDATE: 1 << 32,

  /** 1 << 33 */
  CONTAGIOUS: 1 << 33,

  /** 1 << 34 */
  BLEED_OUT: 1 << 34,

  /** 1 << 35 */
  HIDE_HP_BAR: 1 << 35,

  /** 1 << 36 */
  NO_DAMAGE_BLINK: 1 << 36,

  /** 1 << 37 */
  PERSISTENT: 1 << 37,

  /** 1 << 38 */
  BACKDROP_DETAIL: 1 << 38,

  /** 1 << 39 */
  AMBUSH: 1 << 39,

  /** 1 << 40 */
  GLITCH: 1 << 40,

  /** 1 << 41 */
  SPIN: 1 << 41,

  /** 1 << 42 */
  NO_REWARD: 1 << 42,

  /** 1 << 43 */
  REDUCE_GIBS: 1 << 43,

  /** 1 << 44 */
  TRANSITION_UPDATE: 1 << 44,

  /** 1 << 45 */
  NO_PLAYER_CONTROL: 1 << 45,

  /** 1 << 46 */
  NO_QUERY: 1 << 46,

  /** 1 << 47 */
  KNOCKED_BACK: 1 << 47,

  /** 1 << 48 */
  APPLY_IMPACT_DAMAGE: 1 << 48,

  /** 1 << 49 */
  ICE_FROZEN: 1 << 49,

  /** 1 << 50 */
  ICE: 1 << 50,

  /** 1 << 51 */
  MAGNETIZED: 1 << 51,

  /** 1 << 52 */
  BAITED: 1 << 52,

  /** 1 << 53 */
  KILL_SWITCH: 1 << 53,

  /** 1 << 54 */
  WEAKNESS: 1 << 54,

  /** 1 << 55 */
  EXTRA_GORE: 1 << 55,

  /** 1 << 56 */
  BRIMSTONE_MARKED: 1 << 56,

  /** 1 << 57 */
  HELD: 1 << 57,

  /** 1 << 58 */
  THROWN: 1 << 58,

  /** 1 << 59 */
  FRIENDLY_BALL: 1 << 59,
} as const;

type EntityFlagValue = number & {
  readonly __bitFlagBrand: void;
  readonly __entityFlagBrand: void;
};
type EntityFlagType = {
  [K in keyof typeof EntityFlagInternal]: EntityFlagValue;
};

export const EntityFlag = EntityFlagInternal as EntityFlagType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EntityFlag = EntityFlagType[keyof EntityFlagType];

export const EntityFlagZero = 0 as BitFlags<EntityFlag>;
