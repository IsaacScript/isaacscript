import { PickingUpItem } from "../../types/PickingUpItem";

export type PostItemPickupRegisterParameters = [
  callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void,
  itemType?: ItemType,
  itemID?: CollectibleType | TrinketType | int,
];

const subscriptions: PostItemPickupRegisterParameters[] = [];

/** @internal */
export function postItemPickupHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postItemPickupRegister(
  ...args: PostItemPickupRegisterParameters
): void {
  subscriptions.push(args);
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
