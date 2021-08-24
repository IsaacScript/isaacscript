declare interface EntityProjectile extends Entity {
  AddChangeFlags(flags: int): void;
  AddFallingAccel(value: float): void;
  AddFallingSpeed(value: float): void;
  AddHeight(value: float): void;
  AddProjectileFlags(flags: ProjectileFlags): void;
  AddScale(value: float): void;
  ClearProjectileFlags(flags: int): void;
  HasProjectileFlags(flags: int): void;

  Acceleration: float;
  ChangeFlags: ProjectileFlags;
  ChangeTimeout: int;
  ChangeVelocity: float;
  CurvingStrength: float;
  Damage: float;
  DepthOffset: float;
  FallingAccel: float;
  FallingSpeed: float;
  Height: float;
  HomingStrength: float;
  ProjectileFlags: ProjectileFlags;
  Scale: float;
  WiggleFrameOffset: int;
}
