declare class EntityTear extends Entity {
  ChangeVariant(newVariant: TearVariant | int): void;
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
  TearFlags: TearFlags;
  readonly TearIndex: int;
  WaitFrames: int;
}
