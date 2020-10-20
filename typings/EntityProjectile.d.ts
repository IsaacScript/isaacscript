declare class EntityProjectile extends Entity {
  AddHeight(value: float): void;
  AddFallingSpeed(value: float): void;
  AddFallingAccel(value: float): void;
  AddChangeFlags(flags: int): void;
  AddScale(value: float): void;
  AddProjectileFlags(flags: int): void;

  Height: float;
  FallingSpeed: float;
  FallingAccel: float;
  HomingStrength: float;
  CurvingStrength: float;
  Acceleration: float;
  WiggleFrameOffset: int;
  ChangeFlags: int;
  ChangeVelocity: float;
  ChangeTimeout: int;
  Scale: float;
  ProjectileFlags: int;
  DepthOffset: float;
  Damage: float;
}
