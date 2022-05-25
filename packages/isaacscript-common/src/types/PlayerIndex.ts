/**
 * PlayerIndex is a specific type of string; see the documentation for the [[`getPlayerIndex`]]
 * function. Mods can signify that data structures handle `EntityPlayer` by using this type.
 *
 * For example:
 *
 * ```ts
 * const playersNameMap = new Map<PlayerIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type PlayerIndex = int & { __playerIndexBrand: unknown };
