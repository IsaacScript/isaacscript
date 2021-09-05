declare interface EntityTear extends Entity {
  /**
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  AddTearFlags(flags: TearFlags): void;
  ChangeVariant(newVariant: TearVariant | int): void;
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
  ResetSpriteScale(): void;
  SetDeadEyeIntensity(intensity: float): void;
  SetKnockbackMultiplier(multiplier: float): void;
  SetParentOffset(offset: Vector): void;
  SetWaitFrames(value: int): void;

  readonly BaseDamage: float;
  readonly BaseScale: float;
  Bounced: boolean;
  CanTriggerStreakEnd: boolean;
  ContinueVelocity: Vector;
  FallingAcceleration: float;
  FallingSpeed: float;
  Height: float;
  HomingFriction: float;
  KnockbackMultiplier: float;
  ParentOffset: Vector;
  readonly PosDisplacement: Readonly<Vector>;
  Rotation: float;
  Scale: float;
  StickDiff: Vector;
  StickTarget: Entity;
  StickTimer: int;
  /**
   * Be aware that this is really a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  TearFlags: int;
  /**
   * - In each run, the game keeps track of how many tears have been fired by the player in total.
   * This is used for items such as Lead Pencil.
   * - TearIndex represents this tear counter.
   * - It is 0-indexed, meaning that the first tear fired by the player on a run will have a
   * TearIndex of 0, the second tear fired by the player on a run will have a TearIndex of 1,and so
   * on.
   */
  readonly TearIndex: int;
  WaitFrames: int;
}
