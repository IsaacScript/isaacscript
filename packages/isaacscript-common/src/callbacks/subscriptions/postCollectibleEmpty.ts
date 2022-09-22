import { CollectibleType } from "isaac-typescript-definitions";

export type PostCollectibleEmptyRegisterParameters = [
  callback: (
    collectible: EntityPickupCollectible,
    oldCollectibleType: CollectibleType,
  ) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostCollectibleEmptyRegisterParameters[] = [];

export function postCollectibleEmptyHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postCollectibleEmptyRegister(
  ...args: PostCollectibleEmptyRegisterParameters
): void {
  subscriptions.push(args);
}

export function postCollectibleEmptyFire(
  collectible: EntityPickupCollectible,
  oldCollectibleType: CollectibleType,
): void {
  for (const [callback, collectibleType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      collectibleType !== undefined &&
      collectibleType !== oldCollectibleType
    ) {
      continue;
    }

    callback(collectible, oldCollectibleType);
  }
}
