import {
  CollectibleType,
  ItemType,
  TrinketType,
} from "isaac-typescript-definitions";
import { PickingUpItem } from "../../types/PickingUpItem";

export type PreItemPickupRegisterParameters = [
  callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
  itemType?: ItemType,
  itemID?: CollectibleType | TrinketType,
];

const subscriptions: PreItemPickupRegisterParameters[] = [];

/** @internal */
export function preItemPickupHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preItemPickupRegister(
  ...args: PreItemPickupRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function preItemPickupFire(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {
  for (const [callback, itemType, itemID] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (itemType !== undefined && itemType !== pickingUpItem.itemType) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (itemID !== undefined && itemID !== pickingUpItem.subType) {
      continue;
    }

    callback(player, pickingUpItem);
  }
}
