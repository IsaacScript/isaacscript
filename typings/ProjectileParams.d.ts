/** @noSelf */
declare function ProjectileParams(): ProjectileParams;

declare class ProjectileParams {
  GridCollision: boolean;
  HeightModifier: float;
  FallingSpeedModifier: float;
  FallingAccelModifier: float;
  VelocityMulti: float;
  Scale: float;
  CircleAngle: float;
  HomingStrength: float;
  CurvingStrength: float;
  Acceleration: float;
  Spread: float;
  Color: Color;
  BulletFlags: int;
  PositionOffset: Vector;
  TargetPosition: Vector;
  FireDirectionLimit: Vector;
  DotProductLimit: float;
  WiggleFrameOffset: int;
  ChangeFlags: ProjectileFlags;
  ChangeVelocity: float;
  ChangeTimeout: int;
  DepthOffset: float;
  Variant: ProjectileVariant;
}
