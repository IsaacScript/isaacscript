import type { LaserVariant } from "../../enums/collections/variants";
import type { TearFlag } from "../../enums/flags/TearFlag";

declare global {
  interface EntityLaser extends Entity {
    readonly AddTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    readonly ClearTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => void;
    readonly GetEndPoint: () => Readonly<Vector>;

    // GetNonOptimizedSamples is not implemented.

    readonly GetRenderZ: () => int;

    // GetSamples is not implemented.

    readonly HasTearFlags: (flags: TearFlag | BitFlags<TearFlag>) => boolean;
    readonly IsCircleLaser: () => boolean;
    readonly IsSampleLaser: () => boolean;

    readonly SetActiveRotation: (
      delay: int,
      angleDegrees: float,
      rotationSpeed: float,
      timeoutComplete: boolean,
    ) => void;

    readonly SetBlackHpDropChance: (chance: float) => void;

    // SetHomingType is not implemented.

    readonly SetMaxDistance: (distance: float) => void;
    readonly SetMultidimensionalTouched: (value: boolean) => void;
    readonly SetOneHit: (value: boolean) => void;
    readonly SetTimeout: (value: int) => void;

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
