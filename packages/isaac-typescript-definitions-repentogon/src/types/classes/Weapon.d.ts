import type {
  CollectibleType,
  Direction,
  WeaponType,
} from "isaac-typescript-definitions";
import type { WeaponModifierFlag } from "../../enums/flags/WeaponModifierFlag";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface Weapon extends IsaacAPIClass {
    /** Stops the weapon's current collectible animation. */
    ClearItemAnim: (collectible: CollectibleType) => void;

    /** Returns the weapon's current charge. */
    GetCharge: () => int;

    /** Returns the weapon's current direction. */
    GetDirection: () => Vector;

    /** Returns the weapon's current fire delay. */
    GetFireDelay: () => int;

    /** Returns the weapon's max fire delay. */
    GetMaxFireDelay: () => int;

    /** Returns the weapon's modifiers. */
    GetModifiers: () => BitFlags<WeaponModifierFlag>;

    /**
     * Returns how many times the weapon has fired its attack. This is reset upon leaving the run.
     */
    GetNumFired: () => int;

    /** Returns the owner of the weapon. Returns undefined if the weapon has no owners. */
    GetOwner: () => Entity | undefined;

    /** Returns the weapon's `WeaponType`. */
    GetWeaponType: () => WeaponType;

    /** Returns whether the weapon is aligned to its axis. */
    IsAxisAligned: () => boolean;

    /** Returns whether the weapon's collectible animation is finished. */
    IsItemAnimFinished: (collectible: CollectibleType) => boolean;

    /** Plays the weapon's collectible animation. */
    PlayItemAnim: (
      collectible: CollectibleType,
      aimDirection: Direction,
      position: Vector,
      charge: int,
    ) => void;

    /**
     * Sets the weapon's charge. If the provided `charge` is higher than the charge capacity, the
     * weapon will discharge its attack.
     */
    SetCharge: (charge: int) => void;

    /**
     * Sets the weapon's fire delay for the provided duration in frames.
     *
     * The fire delay is not used by all weapons in the game, such as Mom's Knife.
     */
    SetFireDelay: (duration: int) => void;

    /** Locks the player's head direction for the provided duration in frames. */
    SetHeadLockTime: (duration: int) => void;

    /** Sets the weapon's modifiers. */
    SetModifiers: (
      modifiers: WeaponModifierFlag | BitFlags<WeaponModifierFlag>,
    ) => void;
  }
}
