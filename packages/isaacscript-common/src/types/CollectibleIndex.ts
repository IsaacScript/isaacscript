/**
 * `CollectibleIndex` is a specific type of string that represents a unique identifier for a
 * collectible. Mods can signify that data structures handle collectibles by using this type.
 *
 * For more information, see the documentation for the `getCollectibleIndex` function.
 *
 * For example:
 *
 * ```ts
 * const collectiblesNameMap = new Map<CollectibleIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type CollectibleIndex = string & {
  readonly __collectibleIndexBrand: symbol;
};
