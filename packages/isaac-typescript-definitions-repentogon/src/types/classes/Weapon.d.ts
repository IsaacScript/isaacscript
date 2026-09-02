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
    readonly ClearItemAnim: (collectible: CollectibleType) => void;

    /** Returns the weapon's current charge. */
    readonly GetCharge: () => int;

    /** Returns the weapon's current direction. */
    readonly GetDirection: () => Vector;

    /** Returns the weapon's current fire delay. */
    readonly GetFireDelay: () => int;

    /**
     * Returns the active entity used by the weapon. Returns undefined if the active entity is not
     * found.
     */
    readonly GetMainEntity: () => Entity | undefined;

    /** Returns the max charge of the weapon. */
    readonly GetMaxCharge: () => int;

    /** Returns the weapon's max fire delay. */
    readonly GetMaxFireDelay: () => int;

    /** Returns the weapon's modifiers. */
    readonly GetModifiers: () => BitFlags<WeaponModifierFlag>;

    /**
     * Returns how many times the weapon has fired its attack. This is reset upon leaving the run.
     */
    readonly GetNumFired: () => int;

    /** Returns the owner of the weapon. Returns undefined if the weapon has no owners. */
    readonly GetOwner: () => Entity | undefined;

    /** Returns the weapon's `WeaponType`. */
    readonly GetWeaponType: () => WeaponType;

    /** Returns whether the weapon is aligned to its axis. */
    readonly IsAxisAligned: () => boolean;

    /** Returns whether the weapon's collectible animation is finished. */
    readonly IsItemAnimFinished: (collectible: CollectibleType) => boolean;

    /** Plays the weapon's collectible animation. */
    readonly PlayItemAnim: (
      collectible: CollectibleType,
      aimDirection: Direction,
      position: Vector,
      charge: int,
    ) => void;

    /**
     * Sets the weapon's charge. If the provided `charge` is higher than the charge capacity, the
     * weapon will discharge its attack.
     */
    readonly SetCharge: (charge: int) => void;

    /**
     * Sets the weapon's fire delay for the provided duration in frames.
     *
     * The fire delay is not used by all weapons in the game, such as Mom's Knife.
     */
    readonly SetFireDelay: (duration: int) => void;

    /** Locks the player's head direction for the provided duration in frames. */
    readonly SetHeadLockTime: (duration: int) => void;

    /** Sets the weapon's modifiers. */
    readonly SetModifiers: (
      modifiers: WeaponModifierFlag | BitFlags<WeaponModifierFlag>,
    ) => void;
  }
}
