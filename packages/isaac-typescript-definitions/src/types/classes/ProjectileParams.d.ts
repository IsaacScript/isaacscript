import type { ProjectileVariant } from "../../enums/collections/variants";
import type { ProjectileFlag } from "../../enums/flags/ProjectileFlag";

declare global {
  function ProjectileParams(this: void): ProjectileParams;

  interface ProjectileParams extends IsaacAPIClass {
    Acceleration: float;
    BulletFlags: BitFlags<ProjectileFlag>;
    ChangeFlags: BitFlags<ProjectileFlag>;
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
    Variant: ProjectileVariant;
    VelocityMulti: float;
    WiggleFrameOffset: int;
  }
}
