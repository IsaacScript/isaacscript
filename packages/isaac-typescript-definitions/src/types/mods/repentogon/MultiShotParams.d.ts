import type { WeaponType } from "../../../enums/WeaponType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface MultiShotParams {
    /**
     * When more than one eye is active, defines the angle the eyes are offset to each other.
     * Similar to cross eye effect.
     *
     * For example, for The Wiz item it is 45.
     */
    GetMultiEyeAngle: () => number;

    /**
     * Returns the number of eyes simultaneously shooting. Examples: For The Wiz, its 2, for mutant
     * Spider its 1.
     */
    GetNumEyesActive: () => int;

    /**
     * Returns the amount of lanes used to spread the shot tears onto. Lane positions are calculated
     * by dividing the area, defined by the shooting direction +- the spreadAngle, by the number of
     * lanes. This will create a pattern similar to a symmetrical hand fan. Normally the number of
     * lanes should be the same number as the amount of tears divided by the number of eyes.
     *
     * A smaller number of lanes than the amount of tears will cause tears to overlap each other. A
     * higher lane count than tears will make the fan pattern asymmetrical.
     */
    GetNumLanesPerEye: () => int;

    /**
     * Returns the amount of tears additionally shot in random directions. Same effect as "Eye Sore"
     * collectible.
     */
    GetNumRandomDirTears: () => int;

    /** Returns the amount of tears the player can currently simultaneously fire. */
    GetNumTears: () => int;

    /** Get the spread angle for the given WeaponType. */
    GetSpreadAngle: (weaponType: WeaponType) => int;

    /**
     * Returns if a cross eye effect is active. I.E: player shoots in two directions with 45° offset
     * to each other.
     */
    IsCrossEyed: () => boolean;

    /**
     * Returns if two additional shots sideways will be triggered. Similar effect to Loki's horns.
     */
    IsShootingSideways: () => boolean;

    /** Set if an additional shot backwards will be triggered. Similar effect to Mom's Eye. */
    SetIsShootingBackwards: (isBackwards: boolean) => void;

    /** Set if two additional shots sideways will be triggered. Similar effect to Loki's horns. */
    SetIsShootingSideways: (isSideways: boolean) => void;

    /**
     * When more than one eye is active, defines the angle the eyes are offset to each other.
     * Similar to cross eye effect.
     *
     * Example: for The Wiz, this is 45.
     */
    SetMultiEyeAngle: (angle: number) => void;

    /**
     * Set the number of eyes simultaneously shooting. Examples: For The Wiz, its 2, for mutant
     * Spider its 1.
     */
    SetNumEyesActive: (amount: number) => void;

    SetNumLanesPerEye: (amount: number) => void;

    /**
     * Set the amount of tears additionally shot in random directions. Same effect as "Eye Sore"
     * collectible.
     */
    SetNumRandomDirTears: (amount: number) => void;

    /** Set the amount of tears the player can currently simultaneously fire. */
    SetNumTears: (amount: number) => void;

    /** Set the spread angle for the given WeaponType. */
    SetSpreadAngle: (weapon: WeaponType, angle: number) => void;
  }
}
