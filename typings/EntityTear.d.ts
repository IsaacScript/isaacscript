declare class EntityTear extends Entity {
  SetKnockbackMultiplier(multiplier: float): void;
  SetWaitFrames(value: int): void;
  SetDeadEyeIntensity(intensity: float): void;
  ChangeVariant(newVariant: int): void;
  SetParentOffset(offset: Vector): void;
  ResetSpriteScale(): void;

  Height: float;
  FallingSpeed: float;
  FallingAcceleration: float;
  Scale: float;
  TearFlags: int;
  readonly TearIndex: int;
  Rotation: float;
  HomingFriction: float;
  readonly BaseScale: float;
  WaitFrames: int;
  ContinueVelocity: Vector;
  readonly BaseDamage: float;
  KnockbackMultiplier: float;
  Bounced: boolean;
  StickTarget: Entity;
  StickDiff: Vector;
  StickTimer: int;
  CanTriggerStreakEnd: boolean;
  readonly PosDisplacement: Readonly<Vector>;
  ParentOffset: Vector;
}
