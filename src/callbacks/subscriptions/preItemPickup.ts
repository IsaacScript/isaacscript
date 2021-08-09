import PickingUpItem from "../../types/PickingUpItem";

export type PreItemPickupCallbackType = (
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
) => void;

const subscriptions: Array<
  [PreItemPickupCallbackType, ItemType | undefined, int | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PreItemPickupCallbackType,
  itemType?: ItemType,
  itemID?: int,
): void {
  subscriptions.push([callback, itemType, itemID]);
}

export function fire(player: EntityPlayer, pickingUpItem: PickingUpItem): void {
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
