type CallbackType = (collectible: EntityPickup) => void;

export type PostCollectibleInitFirstRegisterParameters = [
  callback: CallbackType,
  collectibleType?: CollectibleType | int,
];

const subscriptions: PostCollectibleInitFirstRegisterParameters[] = [];

/** @internal */
export function postCollectibleInitFirstHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCollectibleInitFirstRegister(
  callback: CallbackType,
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
