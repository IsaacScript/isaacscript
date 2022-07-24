/**
 * `PlayerIndex` is a specific type of number that represents a unique identifier for a player. Mods
 * can signify that data structures handle `EntityPlayer` by using this type. For more information,
 * see the documentation for the `getPlayerIndex` function.
 *
 * For example:
 *
 * ```ts
 * const playersNameMap = new Map<PlayerIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type PlayerIndex = int & { readonly __playerIndexBrand: symbol };
