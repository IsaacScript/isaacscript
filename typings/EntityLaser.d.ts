declare class EntityLaser extends Entity {
  SetTimeout(value: int): void;
  SetActiveRotation(
    delay: int,
    angleDegrees: float,
    rotationSpeed: float,
    timeoutComplete: boolean,
  ): void;
  GetRenderZ(): int;
  GetEndPoint(): Readonly<Vector>;
  IsSampleLaser(): boolean;
  // GetSamples(): Readonly<HomingLaserSampleList>; // HomingLaser is not implemented
  // GetNonOptimizedSamples(): Readonly<HomingLaserSampleList>; // HomingLaser is not implemented
  SetOneHit(value: boolean): void;
  // SetHomingType(laserHomingType: LaserHomingType): void; // LaserHomingType  is not implemented
  SetMaxDistance(distance: float): void;
  IsCircleLaser(): boolean;
  SetBlackHpDropChance(chance: float): void;
  SetMultidimensionalTouched(value: boolean): void;

  /** @noSelf */
  static ShootAngle(
    variant: LaserVariant | int,
    sourcePos: Vector,
    angleDegrees: float,
    timeout: int,
    posOffset: Vector,
    source: Entity,
  ): EntityLaser;
  /** @noSelf */
  static CalculateEndPoint(
    start: Vector,
    dir: Vector,
    positionOffset: Vector,
    parent: Entity,
    margin: float,
  ): Vector;

  TearFlags: TearFlags;
  Angle: float;
  Radius: float;
  ParentOffset: Vector;
  StartAngleDegrees: float;
  AngleDegrees: float;
  LastAngleDegrees: float;
  Timeout: int;
  FirstUpdate: boolean;
  SampleLaser: boolean;
  Shrink: boolean;
  LaserLength: float;
  // HomingLaser: HomingLaser; // HomingLaser is not implemented
  CurveStrength: float;
  IsActiveRotating: boolean;
  RotationDelay: int;
  RotationDegrees: float;
  RotationSpd: float;
  MaxDistance: float;
  // HomingType: LaserHomingType; // LaserHomingType is not implemented
  EndPoint: Vector;
  DisableFollowParent: boolean;
  BounceLaser: Entity;
  BlackHpDropChance: float;
  OneHit: boolean;
  GridHit: boolean;
}
