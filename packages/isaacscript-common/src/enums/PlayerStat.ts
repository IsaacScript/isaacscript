/** This represents the kinds of stats that a player can have. */
export enum PlayerStat {
  /** Corresponds to `CacheFlag.DAMAGE` (1 << 0) and `EntityPlayer.Damage`. */
  DAMAGE,

  /** Corresponds to `CacheFlag.FIRE_DELAY` (1 << 1) and `EntityPlayer.MaxFireDelay`. */
  FIRE_DELAY,

  /** Corresponds to `CacheFlag.SHOT_SPEED` (1 << 2) and `EntityPlayer.ShotSpeed`. */
  SHOT_SPEED,

  /** Corresponds to `CacheFlag.RANGE` (1 << 3) and `EntityPlayer.TearHeight`. */
  TEAR_HEIGHT,

  /** Corresponds to `CacheFlag.RANGE` (1 << 3) and `EntityPlayer.TearRange`. */
  TEAR_RANGE,

  /** Corresponds to `CacheFlag.RANGE` (1 << 3) and `EntityPlayer.TearFallingAcceleration`. */
  TEAR_FALLING_ACCELERATION,

  /** Corresponds to `CacheFlag.RANGE` (1 << 3) and `EntityPlayer.TearFallingSpeed`. */
  TEAR_FALLING_SPEED,

  /** Corresponds to `CacheFlag.SPEED` (1 << 4) and `EntityPlayer.MoveSpeed`. */
  MOVE_SPEED,

  /** Corresponds to `CacheFlag.TEAR_FLAG` (1 << 5) and `EntityPlayer.TearFlags`. */
  TEAR_FLAG,

  /** Corresponds to `CacheFlag.TEAR_COLOR` (1 << 6) and `EntityPlayer.TearColor`. */
  TEAR_COLOR,

  /** Corresponds to `CacheFlag.FLYING` (1 << 7) and `EntityPlayer.CanFly`. */
  FLYING,

  // - `CacheFlag.WEAPON` (1 << 8) does not have a corresponding `EntityPlayer` field.
  // - `CacheFlag.FAMILIARS` (1 << 9) does not have a corresponding `EntityPlayer` field.

  /** Corresponds to `CacheFlag.LUCK` (1 << 10) and `EntityPlayer.Luck`. */
  LUCK,

  /** Corresponds to `CacheFlag.SIZE` (1 << 11) and `EntityPlayer.SpriteScale`. */
  SIZE,

  // - `CacheFlag.COLOR` (1 << 12) does not have a corresponding `EntityPlayer` field.
  // - `CacheFlag.PICKUP_VISION` (1 << 13) does not have a corresponding `EntityPlayer` field.
}
