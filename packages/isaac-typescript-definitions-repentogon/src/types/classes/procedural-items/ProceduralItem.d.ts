/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface ProceduralItem {
  /** Returns the damage the item grants. */
  GetDamage: () => number;

  /**
   * Returns the `ProceduralEffect` of the item from the specified index. Returns undefined if none
   * were found.
   */
  GetEffect: (index: int) => ProceduralEffect | undefined;

  /** Returns the total number of effects the item has. */
  GetEffectCount: () => int;

  /** Returns the fire delay the item grants. */
  GetFireDelay: () => number;

  /** Returns the `CollectibleType` of the item. */
  GetID: () => int;

  /** Returns the `ItemConfigItem` of the item. */
  GetItem: () => ItemConfigItem;

  /** Returns the luck the item grants. */
  GetLuck: () => number;

  /** Returns the amount of range the item grants. */
  GetRange: () => number;

  /** Returns the amount of shot speed the item grants. */
  GetShotSpeed: () => number;

  /** Returns the amount of speed the item grants. */
  GetSpeed: () => number;

  /**
   * Returns the target `ItemConfigItem` that was randomly selected during the procedural item's
   * creation. Returns undefined if none were selected.
   */
  GetTargetItem: () => ItemConfigItem | undefined;
}
