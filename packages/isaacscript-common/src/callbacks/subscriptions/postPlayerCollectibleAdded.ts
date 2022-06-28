import { CollectibleType } from "isaac-typescript-definitions";

export type PostPlayerCollectibleAddedRegisterParameters = [
  callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostPlayerCollectibleAddedRegisterParameters[] = [];

/** @internal */
export function postPlayerCollectibleAddedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerCollectibleAddedRegister(
  ...args: PostPlayerCollectibleAddedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerCollectibleAddedFire(
  player: EntityPlayer,
  collectibleType: CollectibleType,
): void {
  for (const [callback, callbackCollectibleType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackCollectibleType !== undefined &&
      callbackCollectibleType !== collectibleType
    ) {
      continue;
    }

    callback(player, collectibleType);
  }
}
