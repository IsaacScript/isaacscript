import { CollectibleType } from "isaac-typescript-definitions";

export type PostPlayerCollectibleRemovedRegisterParameters = [
  callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostPlayerCollectibleRemovedRegisterParameters[] = [];

export function postPlayerCollectibleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerCollectibleRemovedRegister(
  ...args: PostPlayerCollectibleRemovedRegisterParameters
): void {
  subscriptions.push(args);
}

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
