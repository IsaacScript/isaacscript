/**
 * Helper function to add a bit flag to an existing set of bit flags.
 *
 * Example:
 * ```
 * // Give the player spectral tears
 * const player = Isaac.GetPlayer();
 * player.TearFlags = addFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL);
 * ```
 *
 * @param flags The existing set of bit flags.
 * @param flag The bit flag to add.
 * @returns The combined bit flags.
 */
export function addFlag(flags: int, flag: int): int {
  return flags | flag;
}

/**
 * Helper function to check to see if a particular bit flag is set to true on an existing set of bit
 * flags.
 *
 * Example:
 * ```
 * const player = Isaac.GetPlayer();
 * if (hasFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL) {
 *   // The player currently has spectral tears
 * }
 * ```
 *
 * @param flags The existing set of bit flags.
 * @param flag The bit flag to check for.
 */
export function hasFlag(flags: int, flag: int): boolean {
  return (flags & flag) === flag;
}

/**
 * Helper function to remove a bit flag from an existing set of bit flags.
 *
 * Example:
 * ```
 * // Remove spectral tears from the player, if present
 * const player = Isaac.GetPlayer();
 * player.TearFlags = removeFlag(player.TearFlags, TearFlags.TEAR_SPECTRAL);
 * ```
 *
 * @param flags The existing set of bit flags.
 * @param flag The bit flag to remove.
 * @returns The combined bit flags.
 */
export function removeFlag(flags: int, flag: int): int {
  return flags & ~flag;
}
