import { DamageFlag } from "isaac-typescript-definitions";
import type { ReadonlyRecord } from "../types/ReadonlyRecord";

/**
 * Helper function to add a bit flag to an existing set of bit flags.
 *
 * This is a variadic function, so pass as many flags as you want to add.
 *
 * Example 1:
 *
 * ```ts
 * // Give the player spectral tears
 * const player = Isaac.GetPlayer();
 * player.TearFlags = addFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL);
 * ```
 *
 * Example 2:
 *
 * ```ts
 * // Give the player spectral and homing tears
 * const player = Isaac.GetPlayer();
 * player.TearFlags = addFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL, TearFlags.TEAR_HOMING);
 * ```
 *
 * @param flags The existing set of bit flags.
 * @param flagsToAdd One or more bit flags to add, each as a separate argument.
 * @returns The combined bit flags.
 */
export function addFlag<T extends BitFlag | BitFlag128>(
  flags: T | BitFlags<T>,
  ...flagsToAdd: readonly T[]
): BitFlags<T> {
  let flagsAsInt = flags as int;

  for (const flagToAdd of flagsToAdd) {
    flagsAsInt |= flagToAdd as int;
  }

  return flagsAsInt as unknown as BitFlags<T>;
}

/**
 * Helper function for casting a flag enum value to a `BitFlags` object.
 *
 * This is useful because the compiler will prevent you from assigning a specific flag to a
 * `BitFlags` field. (It does this to ensure type safety, since `BitFlags` can represent a zero
 * value or a composition of N flags.)
 *
 * For example:
 *
 * ```ts
 * player.TearFlags = bitFlags(TearFlag.SPECTRAL);
 * ```
 */
export function bitFlags<T extends BitFlag | BitFlag128>(flag: T): BitFlags<T> {
  return flag as BitFlags<T>;
}

/**
 * Helper function to get the key associated with a particular flag.
 *
 * (Since bit flags are represented by custom objects instead of normal TypeScript enums, you cannot
 * use the reverse mapping to find the associated key of a given enum value. Use this helper
 * function instead of indexing the enum directly.)
 */
export function getFlagName<T extends BitFlag | BitFlag128>(
  flag: BitFlag,
  flagEnum: ReadonlyRecord<string, T>,
): string | undefined {
  for (const [key, value] of Object.entries(flagEnum)) {
    if (value === flag) {
      return key;
    }
  }

  return undefined;
}

/**
 * Helper function to determine if a particular bit flag is set to true.
 *
 * This is a variadic function, so pass as many flags as you want to check for. If passed multiple
 * flags, it will only return true if all of the flags are set.
 *
 * For example:
 *
 * ```ts
 * const player = Isaac.GetPlayer();
 * if (hasFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL) {
 *   // The player currently has spectral tears
 * }
 * ```
 *
 * @param flags The existing set of bit flags.
 * @param flagsToCheck One or more bit flags to check for, each as a separate argument.
 */
export function hasFlag<T extends BitFlag | BitFlag128>(
  flags: T | BitFlags<T>,
  ...flagsToCheck: readonly T[]
): boolean {
  const flagsAsInt = flags as int;

  for (const flagToCheck of flagsToCheck) {
    if (!((flagsAsInt & (flagToCheck as int)) === flagToCheck)) {
      return false;
    }
  }

  return true;
}

/**
 * Helper function to check if every bit in the flag is turned off.
 *
 * (This is equivalent to checking if the flag is equal to 0, but this is not possible without
 * casting the flag to a number.)
 */
export function isEmptyFlag<T extends BitFlag | BitFlag128>(flag: T): boolean {
  return flag === 0;
}

/**
 * Helper function to determine whether damage to a player in the `ENTITY_TAKE_DMG` callback was
 * self-inflicted. For example, damage from a Curse Room door, a Razor, or a Blood Donation Machine
 * would count as self-inflicted damage.
 */
export function isSelfDamage(
  damageFlags: DamageFlag | BitFlags<DamageFlag>,
): boolean {
  return (
    // Exclude self-damage from e.g. Curse Room door spikes.
    hasFlag(damageFlags, DamageFlag.NO_PENALTIES) ||
    // Exclude self-damage from e.g. Razor.
    hasFlag(damageFlags, DamageFlag.RED_HEARTS)
  );
}

/**
 * Helper function to remove a bit flag from an existing set of bit flags.
 *
 * This is a variadic function, so pass as many flags as you want to remove.
 *
 * For example:
 *
 * ```ts
 * // Remove spectral tears from the player, if present
 * const player = Isaac.GetPlayer();
 * player.TearFlags = removeFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL);
 * ```
 *
 * @param flags The existing set of bit flags.
 * @param flagsToRemove One or more bit flags to remove, each as a separate argument.
 * @returns The combined bit flags.
 */
export function removeFlag<T extends BitFlag | BitFlag128>(
  flags: T | BitFlags<T>,
  ...flagsToRemove: readonly T[]
): BitFlags<T> {
  let flagsAsInt = flags as int;

  for (const flagToRemove of flagsToRemove) {
    flagsAsInt &= ~flagToRemove;
  }

  return flagsAsInt as unknown as BitFlags<T>;
}
