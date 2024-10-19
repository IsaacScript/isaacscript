import type { WeaponType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface MultiShotParams {
    /**
     * Returns the angular offset between each eye for multi-shot effects (e.g. 45 degrees for The
     * Wiz). If the player only has one active eye, 0 will be returned.
     */
    GetMultiEyeAngle: () => number;

    /** Returns the number of active eyes that shoots simultaneously (e.g. 2 for The Wiz). */
    GetNumEyesActive: () => int;

    /**
     * Returns the number of lanes used to spread out tears per eye. This determines how tears are
     * distributed during multi-shot effects.
     */
    GetNumLanesPerEye: () => int;

    /** Returns the number of tears fired in random directions, similar to the Eye Sore effect. */
    GetNumRandomDirTears: () => int;

    /** Returns the amount of tears the player can simultaneously fire. */
    GetNumTears: () => int;

    /** Returns the spread angle of the specified `WeaponType`. */
    GetSpreadAngle: (weaponType: WeaponType) => number;

    /** Returns whether the cross-eyed effect is active, similar to The Wiz. */
    IsCrossEyed: () => boolean;

    /** Returns whether the effect that shoots a projectile backwards (like Mom's Eye) is active. */
    IsShootingBackwards: () => boolean;

    /**
     * Returns whether the effect that shoots additional projectiles sideways (like Loki's Horns) is
     * active.
     */
    IsShootingSideways: () => boolean;

    /** Enables or disables the cross-eyed effect (similar to The Wiz). */
    SetIsCrossEyed: (crossed: boolean) => void;

    /** Enables or disables the effect that shoots backwards (similar to Mom's Eye). */
    SetIsShootingBackwards: (shootingBackwards: boolean) => void;

    /** Enables or disables the effect that shoots sideways (similar to Loki's Horns). */
    SetIsShootingSideways: (shootingSideways: boolean) => void;

    /** Sets the angular offset between eyes in multi-shot effects. */
    SetMultiEyeAngle: (angle: number) => void;

    /** Sets the number of eyes that fire projectiles simultaneously. */
    SetNumEyesActive: (eyes: int) => void;

    /** Sets the number of lanes tears are spread into per eye. */
    SetNumLanesPerEye: (lanes: int) => void;

    /** Sets the number of tears fired in random directions, similar to the Eye Sore effect. */
    SetNumRandomDirTears: (tears: int) => void;

    /** Sets the maximum number of tears the player can fire simultaneously. */
    SetNumTears: (tears: int) => void;

    /** Sets the spread angle of the specified `WeaponType`. */
    SetSpreadAngle: (weaponType: WeaponType, angle: number) => void;
  }
}
