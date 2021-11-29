import { PickingUpItem } from "../../types/PickingUpItem";

export type PostItemPickupCallbackType = (
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
) => void;

const subscriptions: Array<
  [PostItemPickupCallbackType, ItemType | undefined, int | undefined]
> = [];

export function postItemPickupHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postItemPickupRegister(
  callback: PostItemPickupCallbackType,
  itemType?: ItemType,
  itemID?: int,
): void {
  subscriptions.push([callback, itemType, itemID]);
}

export function postItemPickupFire(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {
  for (const [callback, itemType, itemID] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (itemType !== undefined && itemType !== pickingUpItem.type) {
      continue;
    }

    // Handle the optional 3rd callback argument
    if (itemID !== undefined && itemID !== pickingUpItem.id) {
      continue;
    }

    callback(player, pickingUpItem);
  }
}
