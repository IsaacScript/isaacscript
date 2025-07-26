/**
 * This is the type that is fed to the `PRE_ITEM_PICKUP` and `POST_ITEM_PICKUP` custom callbacks.
 *
 * @module
 */

import type { TrinketType } from "isaac-typescript-definitions";
import { CollectibleType, ItemType } from "isaac-typescript-definitions";
import { ReadonlySet } from "./ReadonlySet";

export type PickingUpItem =
  | PickingUpItemNull
  | PickingUpItemCollectible
  | PickingUpItemTrinket;

/** Part of `PickingUpItem`. */
export interface PickingUpItemNull {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType.NULL;

  /** Equal to either the collectible type, the trinket type, or 0. */
  subType: 0;
}

/** Part of `PickingUpItem`. */
export interface PickingUpItemCollectible {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR;

  /** Equal to either the collectible type, the trinket type, or 0. */
  subType: CollectibleType;
}

/** Part of `PickingUpItem`. */
export interface PickingUpItemTrinket {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType.TRINKET;

  /** Equal to either the collectible type, the trinket type, or 0. */
  subType: TrinketType;
}

const DEFAULT_ITEM_TYPE = ItemType.NULL;
const DEFAULT_SUB_TYPE = CollectibleType.NULL;

export function newPickingUpItem(): PickingUpItem {
  return {
    itemType: DEFAULT_ITEM_TYPE,
    subType: DEFAULT_SUB_TYPE,
  };
}

/** Helper function to reset a `PickupUpItem` object to all 0 values. */
export function resetPickingUpItem(pickingUpItem: PickingUpItem): void {
  pickingUpItem.itemType = DEFAULT_ITEM_TYPE;
  pickingUpItem.subType = DEFAULT_SUB_TYPE;
}

const COLLECTIBLE_ITEM_TYPES = new ReadonlySet<ItemType>([
  ItemType.PASSIVE, // 1
  ItemType.ACTIVE, // 3
  ItemType.FAMILIAR, // 4
]);

/** Helper function to narrow the type of `PickingUpItem` to `ItemType.NULL` (0). */
export function isPickingUpItemNull(
  pickingUpItem: PickingUpItem,
): pickingUpItem is PickingUpItemTrinket {
  return pickingUpItem.itemType === ItemType.NULL;
}

/**
 * Helper function to narrow the type of `PickingUpItem` to one of the following:
 *
 * - `ItemType.PASSIVE` (1)
 * - `ItemType.ACTIVE` (3)
 * - `ItemType.FAMILIAR` (4)
 */
export function isPickingUpItemCollectible(
  pickingUpItem: PickingUpItem,
): pickingUpItem is PickingUpItemCollectible {
  return COLLECTIBLE_ITEM_TYPES.has(pickingUpItem.itemType);
}

/** Helper function to narrow the type of `PickingUpItem` to `ItemType.TRINKET` (2). */
export function isPickingUpItemTrinket(
  pickingUpItem: PickingUpItem,
): pickingUpItem is PickingUpItemTrinket {
  return pickingUpItem.itemType === ItemType.TRINKET;
}
