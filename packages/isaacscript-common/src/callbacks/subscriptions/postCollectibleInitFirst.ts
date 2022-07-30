import { CollectibleType } from "isaac-typescript-definitions";

export type PostCollectibleInitFirstRegisterParameters = [
  callback: (collectible: EntityPickup) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostCollectibleInitFirstRegisterParameters[] = [];

export function postCollectibleInitFirstHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postCollectibleInitFirstRegister(
  ...args: PostCollectibleInitFirstRegisterParameters
): void {
  subscriptions.push(args);
}

export function postCollectibleInitFirstFire(
  collectible: EntityPickupCollectible,
): void {
  for (const [callback, collectibleType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      collectibleType !== undefined &&
      collectibleType !== collectible.SubType
    ) {
      continue;
    }

    callback(collectible);
  }
}
