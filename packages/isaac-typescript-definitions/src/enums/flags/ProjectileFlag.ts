/**
 * For EntityType.PROJECTILE (9)
 *
 * This is an object instead of a TypeScript enum because we need to specify that it contains bit
 * flags.
 *
 * This enum was renamed from "ProjectileFlags" to be consistent with the other flag enums.
 */
const ProjectileFlagInternal = {
  /** 1 << 0 */
  SMART: 1 << 0,

  /** 1 << 1 */
  EXPLODE: 1 << 1,

  /** 1 << 2 */
  ACID_GREEN: 1 << 2,

  /** 1 << 3 */
  GOO: 1 << 3,

  /** 1 << 4 */
  GHOST: 1 << 4,

  /** 1 << 5 */
  WIGGLE: 1 << 5,

  /** 1 << 6 */
  BOOMERANG: 1 << 6,

  /** 1 << 7 */
  HIT_ENEMIES: 1 << 7,

  /** 1 << 8 */
  ACID_RED: 1 << 8,

  /** 1 << 9 */
  GREED: 1 << 9,

  /** 1 << 10 */
  RED_CREEP: 1 << 10,

  /** 1 << 11 */
  ORBIT_CW: 1 << 11,

  /** 1 << 12 */
  ORBIT_CCW: 1 << 12,

  /** 1 << 13 */
  NO_WALL_COLLIDE: 1 << 13,

  /** 1 << 14 */
  CREEP_BROWN: 1 << 14,

  /** 1 << 15 */
  FIRE: 1 << 15,

  /** 1 << 16 */
  BURST: 1 << 16,

  /** 1 << 17 */
  ANY_HEIGHT_ENTITY_HIT: 1 << 17,

  /** 1 << 18 */
  CURVE_LEFT: 1 << 18,

  /** 1 << 19 */
  CURVE_RIGHT: 1 << 19,

  /** 1 << 20 */
  TURN_HORIZONTAL: 1 << 20,

  /** 1 << 21 */
  SINE_VELOCITY: 1 << 21,

  /** 1 << 22 */
  MEGA_WIGGLE: 1 << 22,

  /** 1 << 23 */
  SAWTOOTH_WIGGLE: 1 << 23,

  /** 1 << 24 */
  SLOWED: 1 << 24,

  /** 1 << 25 */
  TRIANGLE: 1 << 25,

  /** 1 << 26 */
  MOVE_TO_PARENT: 1 << 26,

  /** 1 << 27 */
  ACCELERATE: 1 << 27,

  /** 1 << 28 */
  DECELERATE: 1 << 28,

  /** 1 << 29 */
  BURST3: 1 << 29,

  /** 1 << 30 */
  CONTINUUM: 1 << 30,

  /** 1 << 31 */
  CANT_HIT_PLAYER: 1 << 31,

  /** 1 << 32 */
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

type ProjectileFlagValue = number & {
  readonly __bitFlagBrand: void;
  readonly __projectileFlagBrand: void;
};
type ProjectileFlagType = {
  [K in keyof typeof ProjectileFlagInternal]: ProjectileFlagValue;
};

export const ProjectileFlag = ProjectileFlagInternal as ProjectileFlagType;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ProjectileFlag = ProjectileFlagType[keyof ProjectileFlagType];

export const ProjectileFlagZero = 0 as BitFlags<ProjectileFlag>;
