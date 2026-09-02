/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface ProceduralItem {
  /** Returns the damage the item grants. */
  readonly GetDamage: () => number;

  /**
   * Returns the `ProceduralEffect` of the item from the specified index. Returns undefined if none
   * were found.
   */
  readonly GetEffect: (index: int) => ProceduralEffect | undefined;

  /** Returns the total number of effects the item has. */
  readonly GetEffectCount: () => int;

  /** Returns the fire delay the item grants. */
  readonly GetFireDelay: () => number;

  /** Returns the `CollectibleType` of the item. */
  readonly GetID: () => int;

  /** Returns the `ItemConfigItem` of the item. */
  readonly GetItem: () => ItemConfigItem;

  /** Returns the luck the item grants. */
  readonly GetLuck: () => number;

  /** Returns the amount of range the item grants. */
  readonly GetRange: () => number;

  /** Returns the amount of shot speed the item grants. */
  readonly GetShotSpeed: () => number;

  /** Returns the amount of speed the item grants. */
  readonly GetSpeed: () => number;

  /**
   * Returns the target `ItemConfigItem` that was randomly selected during the procedural item's
   * creation. Returns undefined if none were selected.
   */
  readonly GetTargetItem: () => ItemConfigItem | undefined;
}
