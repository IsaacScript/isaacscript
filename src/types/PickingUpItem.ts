/* eslint-disable sort-exports/sort-exports */

import {
  CollectibleType,
  ItemType,
  TrinketType,
} from "isaac-typescript-definitions";

export type PickingUpItem =
  | PickingUpItemNull
  | PickingUpItemCollectible
  | PickingUpItemTrinket;

export interface PickingUpItemNull {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType.NULL;

  /** Equal to either the collectible type, the trinket type, or 0. */
  subType: 0;
}

export interface PickingUpItemCollectible {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR;

  /** Equal to either the collectible type, the trinket type, or 0. */
  subType: CollectibleType;
}

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

export function resetPickingUpItem(pickingUpItem: PickingUpItem): void {
  pickingUpItem.itemType = DEFAULT_ITEM_TYPE;
  pickingUpItem.subType = DEFAULT_SUB_TYPE;
}
