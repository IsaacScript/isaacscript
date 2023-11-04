import type { ProjectileVariant } from "../../enums/collections/variants";
import type { ProjectileFlag } from "../../enums/flags/ProjectileFlag";

declare global {
  interface EntityProjectile extends Entity {
    /** See `ChangeFlags`. */
    AddChangeFlags: (flags: ProjectileFlag | BitFlags<ProjectileFlag>) => void;

    AddFallingAccel: (value: float) => void;
    AddFallingSpeed: (value: float) => void;
    AddHeight: (value: float) => void;

    /** You can change the attributes of the projectile by adding one or more `ProjectileFlag`. */
    AddProjectileFlags: (
      flags: ProjectileFlag | BitFlags<ProjectileFlag>,
    ) => void;

    AddScale: (value: float) => void;

    ClearProjectileFlags: (
      flags: ProjectileFlag | BitFlags<ProjectileFlag>,
    ) => void;

    HasProjectileFlags: (
      flags: ProjectileFlag | BitFlags<ProjectileFlag>,
    ) => boolean;

    Acceleration: float;

    /**
     * The flags to set when the "changed" state is activated.
     *
     * See `ChangeTimeout` for an explanation of the "changed" state.
     */
    ChangeFlags: ProjectileFlag;

    /**
     * The number of frames that need to pass until the "changed" state is activated.
     *
     * Projectiles can have two states: "normal" and "changed":
     *
     * - The "normal" state is set by default.
     * - The "changed" state activates when the projectile's frame count reaches the value set in
     *   `ChangeTimeout`.
     *
     * When the "changed" state is activated, two things happen:
     *
     * - The flags are changed to what was set in `ChangeFlags`. (But this only happens if the
     *   `ProjectileFlag.CHANGE_FLAGS_AFTER_TIMEOUT` flag was set.)
     * - The velocity is changed to what was set in `ChangeVelocity`. (But this only happens if the
     *   `ProjectileFlag.CHANGE_VELOCITY_AFTER_TIMEOUT` flag was set.
     */
    ChangeTimeout: int;

    /**
     * The velocity to set when the "changed" state is activated.
     *
     * See `ChangeTimeout` for an explanation of the "changed" state.
     */
    ChangeVelocity: float;

    CurvingStrength: float;
    Damage: float;
    DepthOffset: float;
    FallingAccel: float;
    FallingSpeed: float;
    Height: float;
    HomingStrength: float;
    ProjectileFlags: BitFlags<ProjectileFlag>;
    Scale: float;
    Variant: ProjectileVariant;
    WiggleFrameOffset: int;
  }
}
