import { PickingUpItem } from "../../types/PickingUpItem";

export type PostItemPickupCallbackType = (
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
) => void;

const subscriptions: Array<
  [PostItemPickupCallbackType, ItemType | undefined, int | undefined]
> = [];

/** @internal */
export function postItemPickupHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postItemPickupRegister(
  callback: PostItemPickupCallbackType,
  itemType?: ItemType,
  itemID?: int,
): void {
  subscriptions.push([callback, itemType, itemID]);
}

/** @internal */
export function postItemPickupFire(
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
