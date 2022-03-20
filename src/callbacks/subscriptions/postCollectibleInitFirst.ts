export type PostCollectibleInitFirstCallbackType = (
  collectible: EntityPickup,
) => void;

const subscriptions: Array<
  [PostCollectibleInitFirstCallbackType, CollectibleType | int | undefined]
> = [];

/** @internal */
export function postCollectibleInitFirstHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCollectibleInitFirstRegister(
  callback: PostCollectibleInitFirstCallbackType,
  collectibleType?: CollectibleType | int,
): void {
  subscriptions.push([callback, collectibleType]);
}

/** @internal */
export function postCollectibleInitFirstFire(collectible: EntityPickup): void {
  for (const [callback, collectibleType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      collectibleType !== undefined &&
      collectibleType !== collectible.SubType
    ) {
      continue;
    }

    callback(collectible);
  }
}
