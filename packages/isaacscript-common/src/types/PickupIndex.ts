/**
 * `PickupIndex` is a specific type of number that represents a unique identifier for a pickup. Mods
 * can signify that data structures handle collectibles by using this type.
 *
 * For more information, see the documentation for the `getPickupIndex` function.
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
