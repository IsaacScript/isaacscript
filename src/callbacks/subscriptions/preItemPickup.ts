import { PickingUpItem } from "../../types/PickingUpItem";

export type PreItemPickupCallbackType = (
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
) => void;

const subscriptions: Array<
  [PreItemPickupCallbackType, ItemType | undefined, int | undefined]
> = [];

/** @internal */
export function preItemPickupHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preItemPickupRegister(
  callback: PreItemPickupCallbackType,
  itemType?: ItemType,
  itemID?: int,
): void {
  subscriptions.push([callback, itemType, itemID]);
}

/** @internal */
export function preItemPickupFire(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {
  for (const [callback, itemType, itemID] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (itemType !== undefined && itemType !== pickingUpItem.itemType) {
      continue;
    }

    // Handle the optional 3rd callback argument
    if (itemID !== undefined && itemID !== pickingUpItem.subType) {
      continue;
    }

    callback(player, pickingUpItem);
  }
}
