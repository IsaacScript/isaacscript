import { CollectibleType } from "isaac-typescript-definitions";

export type PostPlayerCollectibleAddedRegisterParameters = [
  callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostPlayerCollectibleAddedRegisterParameters[] = [];

export function postPlayerCollectibleAddedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerCollectibleAddedRegister(
  ...args: PostPlayerCollectibleAddedRegisterParameters
): void {
  subscriptions.push(args);
}

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
