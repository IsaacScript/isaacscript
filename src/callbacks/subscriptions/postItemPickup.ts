import PickingUpItem from "../../types/PickingUpItem";

const subscriptions: Array<
  [
    (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
    ItemType | undefined,
    CollectibleType | TrinketType | undefined,
  ]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
  itemType?: ItemType,
  itemID?: CollectibleType | TrinketType | int,
): void {
  subscriptions.push([callback, itemType, itemID]);
}

export function postItemPickup(
  player: EntityPlayer,
  pickingUpItem: PickingUpItem,
): void {
  for (const [callback, itemType, itemID] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (itemType !== undefined && itemType !== pickingUpItem.type) {
      return;
    }

    // Handle the optional 3rd callback argument
    if (itemID !== undefined && itemID !== pickingUpItem.id) {
      return;
    }

    callback(player, pickingUpItem);
  }
}
