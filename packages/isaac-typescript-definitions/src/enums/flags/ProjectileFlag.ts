/**
 * For `EntityType.PROJECTILE` (9).
 *
 * This enum was renamed from "ProjectileFlags" to be consistent with the other flag enums.
 *
 * This is represented as an object instead of an enum due to limitations with TypeScript enums. (We
 * want this type to be a child of the `BitFlag` type.)
 *
 * @enum
 * @notExported
 * @rename ProjectileFlag
 */
const ProjectileFlagInternal = {
  /** 1 << 0 (1) */
  SMART: 1 << 0,

  /** 1 << 1 (2) */
  EXPLODE: 1 << 1,

  /** 1 << 2 (4) */
  ACID_GREEN: 1 << 2,

  /** 1 << 3 (8) */
  GOO: 1 << 3,

  /** 1 << 4 (16) */
  GHOST: 1 << 4,

  /** 1 << 5 (32) */
  WIGGLE: 1 << 5,

  /** 1 << 6 (64) */
  BOOMERANG: 1 << 6,

  /** 1 << 7 (1280 */
  HIT_ENEMIES: 1 << 7,

  /** 1 << 8 (256) */
  ACID_RED: 1 << 8,

  /** 1 << 9 (512) */
  GREED: 1 << 9,

  /** 1 << 10 (1024) */
  RED_CREEP: 1 << 10,

  /** 1 << 11 (2048) */
  ORBIT_CW: 1 << 11,

  /** 1 << 12 (4096) */
  ORBIT_CCW: 1 << 12,

  /** 1 << 13 (8192) */
  NO_WALL_COLLIDE: 1 << 13,

  /** 1 << 14 (16384) */
  CREEP_BROWN: 1 << 14,

  /** 1 << 15 (32768) */
  FIRE: 1 << 15,

  /** 1 << 16 (65536) */
  BURST: 1 << 16,

  /** 1 << 17 (131072) */
  ANY_HEIGHT_ENTITY_HIT: 1 << 17,

  /** 1 << 18 (262144) */
  CURVE_LEFT: 1 << 18,

  /** 1 << 19 (524288) */
  CURVE_RIGHT: 1 << 19,

  /** 1 << 20 (1048576) */
  TURN_HORIZONTAL: 1 << 20,

  /** 1 << 21 (2097152) */
  SINE_VELOCITY: 1 << 21,

  /** 1 << 22 (4194304) */
  MEGA_WIGGLE: 1 << 22,

  /** 1 << 23 (8388608) */
  SAWTOOTH_WIGGLE: 1 << 23,

  /** 1 << 24 (16777216) */
  SLOWED: 1 << 24,

  /** 1 << 25 (33554432) */
  TRIANGLE: 1 << 25,

  /** 1 << 26 (67108864) */
  MOVE_TO_PARENT: 1 << 26,

  /** 1 << 27 (134217728) */
  ACCELERATE: 1 << 27,

  /** 1 << 28 (268435456) */
  DECELERATE: 1 << 28,

  /** 1 << 29 (536870912) */
  BURST3: 1 << 29,

  /** 1 << 30 (1073741824) */
  CONTINUUM: 1 << 30,

  /** 1 << 31 (2147483648) */
  CANT_HIT_PLAYER: 1 << 31,

  /** 1 << 32 (4294967296) */
  CHANGE_FLAGS_AFTER_TIMEOUT: 1 << 32,

  /** 1 << 33 */
  CHANGE_VELOCITY_AFTER_TIMEOUT: 1 << 33,

  /** 1 << 34 */
  STASIS: 1 << 34,

  /** 1 << 35 */
  FIRE_WAVE: 1 << 35,

  /** 1 << 36 */
  FIRE_WAVE_X: 1 << 36,

  /** 1 << 37 */
  ACCELERATE_EX: 1 << 37,

  /** 1 << 38 */
  BURST8: 1 << 38,

  /** 1 << 39 */
  FIRE_SPAWN: 1 << 39,

  /** 1 << 40 */
  ANTI_GRAVITY: 1 << 40,

  /** 1 << 41 */
  TRACTOR_BEAM: 1 << 41,

  /** 1 << 42 */
  BOUNCE: 1 << 42,

  /** 1 << 43 */
  BOUNCE_FLOOR: 1 << 43,

  /** 1 << 44 */
  SHIELDED: 1 << 44,

  /** 1 << 45 */
  BLUE_FIRE_SPAWN: 1 << 45,

  /** 1 << 46 */
  LASER_SHOT: 1 << 46,

  /** 1 << 47 */
  GODHEAD: 1 << 47,

  /** 1 << 48 */
  SMART_PERFECT: 1 << 48,

  /** 1 << 49 */
  BURST_SPLIT: 1 << 49,

  /** 1 << 50 */
  WIGGLE_ROTGUT: 1 << 50,

  /** 1 << 51 */
  FREEZE: 1 << 51,

  /** 1 << 52 */
  ACCELERATE_TO_POSITION: 1 << 52,

  /**
   * The cluster of tears that Mother shoots.
   *
   * 1 << 53
   */
  BROCCOLI: 1 << 53,

  /** 1 << 54 */
  BACK_SPLIT: 1 << 54,

  /** 1 << 55 */
  SIDE_WAVE: 1 << 55,

  /** 1 << 56 */
  ORBIT_PARENT: 1 << 56,

  /** 1 << 57 */
  FADEOUT: 1 << 57,
} as const;

type ProjectileFlagValue = BitFlag & {
  readonly __projectileFlagBrand: symbol;
};
type ProjectileFlagType = {
  readonly [K in keyof typeof ProjectileFlagInternal]: ProjectileFlagValue;
};

export const ProjectileFlag = ProjectileFlagInternal as ProjectileFlagType;
export type ProjectileFlag = ProjectileFlagType[keyof ProjectileFlagType];

export const ProjectileFlagZero = 0 as BitFlags<ProjectileFlag>;
