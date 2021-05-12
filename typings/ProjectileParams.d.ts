declare function ProjectileParams(this: void): ProjectileParams;

declare class ProjectileParams {
  Acceleration: float;
  BulletFlags: int;
  ChangeFlags: ProjectileFlags;
  ChangeTimeout: int;
  ChangeVelocity: float;
  CircleAngle: float;
  Color: Color;
  CurvingStrength: float;
  DepthOffset: float;
  DotProductLimit: float;
  FallingAccelModifier: float;
  FallingSpeedModifier: float;
  FireDirectionLimit: Vector;
  GridCollision: boolean;
  HeightModifier: float;
  HomingStrength: float;
  PositionOffset: Vector;
  Scale: float;
  Spread: float;
  TargetPosition: Vector;
  Variant: ProjectileVariant | int;
  VelocityMulti: float;
  WiggleFrameOffset: int;
}
