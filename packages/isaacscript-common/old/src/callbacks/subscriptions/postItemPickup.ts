import {
  CollectibleType,
  ItemType,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  PickingUpItem,
  PickingUpItemCollectible,
  PickingUpItemTrinket,
} from "../../types/PickingUpItem";

export type PostItemPickupRegisterParameters =
  | [callback: (player: EntityPlayer, pickingUpItem: PickingUpItem) => void]
  | [
      callback: (
        player: EntityPlayer,
        pickingUpItem: PickingUpItemCollectible,
      ) => void,
      itemType: ItemType.PASSIVE | ItemType.ACTIVE | ItemType.FAMILIAR,
      collectibleType?: CollectibleType,
    ]
  | [
      callback: (
        player: EntityPlayer,
        pickingUpItem: PickingUpItemTrinket,
      ) => void,
      itemType: ItemType.TRINKET,
      trinketType?: TrinketType,
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
  for (const [callback, itemType, subType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (itemType !== undefined && itemType !== pickingUpItem.itemType) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (subType !== undefined && subType !== pickingUpItem.subType) {
      continue;
    }

    // @ts-expect-error TypeScript isn't smart enough to treat the above checks as type narrowing.
    callback(player, pickingUpItem);
  }
}
