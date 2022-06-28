import { CollectibleType } from "isaac-typescript-definitions";

export type PostPlayerCollectibleRemovedRegisterParameters = [
  callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostPlayerCollectibleRemovedRegisterParameters[] = [];

/** @internal */
export function postPlayerCollectibleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerCollectibleRemovedRegister(
  ...args: PostPlayerCollectibleRemovedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerCollectibleRemovedFire(
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
