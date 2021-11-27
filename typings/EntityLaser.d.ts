declare interface EntityLaser extends Entity {
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

  GetEndPoint(): Readonly<Vector>;
  // GetNonOptimizedSamples(): Readonly<HomingLaserSampleList>; // HomingLaser is not implemented
  GetRenderZ(): int;
  // GetSamples(): Readonly<HomingLaserSampleList>; // HomingLaser is not implemented

  /**
   * Be aware that this really takes a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  HasTearFlags(flags: TearFlags): boolean;

  IsCircleLaser(): boolean;
  IsSampleLaser(): boolean;

  SetActiveRotation(
    delay: int,
    angleDegrees: float,
    rotationSpeed: float,
    timeoutComplete: boolean,
  ): void;

  SetBlackHpDropChance(chance: float): void;
  // SetHomingType(laserHomingType: LaserHomingType): void; // LaserHomingType is not implemented
  SetMaxDistance(distance: float): void;
  SetMultidimensionalTouched(value: boolean): void;
  SetOneHit(value: boolean): void;
  SetTimeout(value: int): void;

  Angle: float;
  AngleDegrees: float;
  BlackHpDropChance: float;
  BounceLaser: Entity;
  CurveStrength: float;
  DisableFollowParent: boolean;
  EndPoint: Vector;
  FirstUpdate: boolean;
  GridHit: boolean;
  // HomingLaser: HomingLaser; // HomingLaser is not implemented
  // HomingType: LaserHomingType; // LaserHomingType is not implemented
  IsActiveRotating: boolean;
  LaserLength: float;
  LastAngleDegrees: float;
  MaxDistance: float;
  OneHit: boolean;
  ParentOffset: Vector;
  Radius: float;
  RotationDegrees: float;
  RotationDelay: int;
  RotationSpd: float;
  // SampleLaser: boolean; // Should use IsSampleLaser() instead
  Shrink: boolean;
  StartAngleDegrees: float;

  /**
   * Be aware that this is really a BitSet128 instead of an integer.
   * However, all of the TearFlags enums values use BitSet128 constructors.
   */
  TearFlags: int;

  Timeout: int;
}

declare namespace EntityLaser {
  function CalculateEndPoint(
    this: void,
    start: Vector,
    dir: Vector,
    positionOffset: Vector,
    parent: Entity,
    margin: float,
  ): Vector;

  function ShootAngle(
    this: void,
    variant: LaserVariant | int,
    sourcePos: Vector,
    angleDegrees: float,
    timeout: int,
    posOffset: Vector,
    source: Entity,
  ): EntityLaser;
}
