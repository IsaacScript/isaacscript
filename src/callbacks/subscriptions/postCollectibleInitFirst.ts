import { CollectibleType } from "isaac-typescript-definitions";

export type PostCollectibleInitFirstRegisterParameters = [
  callback: (collectible: EntityPickup) => void,
  collectibleType?: CollectibleType | int,
];

const subscriptions: PostCollectibleInitFirstRegisterParameters[] = [];

/** @internal */
export function postCollectibleInitFirstHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCollectibleInitFirstRegister(
  ...args: PostCollectibleInitFirstRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postCollectibleInitFirstFire(collectible: EntityPickup): void {
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
