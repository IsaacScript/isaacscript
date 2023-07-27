import type { LaserVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityLaser extends Entity {
    AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    GetEndPoint: () => Readonly<Vector>;

    // GetNonOptimizedSamples is not implemented.

    GetRenderZ: () => int;

    // GetSamples is not implemented.

    HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;
    IsCircleLaser: () => boolean;
    IsSampleLaser: () => boolean;

    SetActiveRotation: (
      delay: int,
      angleDegrees: float,
      rotationSpeed: float,
      timeoutComplete: boolean,
    ) => void;

    SetBlackHpDropChance: (chance: float) => void;

    // SetHomingType is not implemented.

    SetMaxDistance: (distance: float) => void;
    SetMultidimensionalTouched: (value: boolean) => void;
    SetOneHit: (value: boolean) => void;
    SetTimeout: (value: int) => void;

    Angle: float;
    AngleDegrees: float;
    BlackHpDropChance: float;
    BounceLaser: Entity;
    CurveStrength: float;
    DisableFollowParent: boolean;
    EndPoint: Vector;
    FirstUpdate: boolean;
    GridHit: boolean;

    // HomingLaser is not implemented.

    // HomingType is not implemented.

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

    // SampleLaser is not implemented; use `EntityLaser.IsSampleLaser` instead.

    Shrink: boolean;
    StartAngleDegrees: float;
    TearFlags: BitFlags<TearFlag>;
    Timeout: int;
    Variant: LaserVariant;
  }

  /** @noSelf */
  namespace EntityLaser {
    function CalculateEndPoint(
      start: Vector,
      dir: Vector,
      positionOffset: Vector,
      parent: Entity,
      margin: float,
    ): Vector;

    function ShootAngle(
      variant: LaserVariant,
      sourcePos: Vector,
      angleDegrees: float,
      timeout: int,
      posOffset: Vector,
      source: Entity,
    ): EntityLaser;
  }
}
