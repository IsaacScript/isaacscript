declare interface EntityKnife extends Entity {
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
  GetKnifeDistance(): float;
  GetKnifeVelocity(): float;
  GetRenderZ(): int;
  /**
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  HasTearFlags(flags: TearFlags): boolean;
  IsFlying(): boolean;
  Reset(): void;
  SetPathFollowSpeed(speed: float): void;
  Shoot(charge: float, range: float): void;

  Charge: float;
  MaxDistance: float;
  PathFollowSpeed: float;
  PathOffset: float;
  Rotation: float;
  RotationOffset: float;
  Scale: float;
  /**
   * Be aware that this is really a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  TearFlags: int;
}
