declare class EntityTear extends Entity {
  AddTearFlags(flags: BitSet128): void;
  ChangeVariant(newVariant: TearVariant | int): void;
  ClearTearFlags(flags: BitSet128): void;
  HasTearFlags(flags: BitSet128): boolean;
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
  TearFlags: BitSet128;
  readonly TearIndex: int;
  WaitFrames: int;
}
