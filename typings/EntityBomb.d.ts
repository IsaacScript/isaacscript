declare interface EntityBomb extends Entity {
  /**
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  AddTearFlags(flags: TearFlags): void;

  /**
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  ClearTearFlags(flags: TearFlags): void;

  /**
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  HasTearFlags(flags: TearFlags): boolean;

  SetExplosionCountdown(countdown: int): void;

  ExplosionDamage: float;

  /**
   * Be aware that this is really a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  Flags: int;

  IsFetus: boolean;
  RadiusMultiplier: float;
}
