/**
 * `PickupIndex` is a specific type of string; see the documentation for the `getPickupIndex`
 * function. Mods can signify that data structures handle collectibles by using this type.
 *
 * For example:
 *
 * ```ts
 * const pickupNameMap = new Map<PickupIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type PickupIndex = int & {
  readonly __pickupIndexBrand: symbol;
};
