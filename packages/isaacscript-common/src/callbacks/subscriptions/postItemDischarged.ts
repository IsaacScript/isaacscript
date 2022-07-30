import { ActiveSlot, CollectibleType } from "isaac-typescript-definitions";

export type PostItemDischargedRegisterParameters = [
  callback: (
    player: EntityPlayer,
    collectibleType: CollectibleType,
    activeSlot: ActiveSlot,
  ) => void,
  collectibleType?: CollectibleType,
];

const subscriptions: PostItemDischargedRegisterParameters[] = [];

export function postItemDischargeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postItemDischargeRegister(
  ...args: PostItemDischargedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postItemDischargeFire(
  player: EntityPlayer,
  collectibleType: CollectibleType,
  activeSlot: ActiveSlot,
): void {
  for (const [callback, callbackCollectibleType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackCollectibleType !== undefined &&
      callbackCollectibleType !== collectibleType
    ) {
      continue;
    }

    callback(player, collectibleType, activeSlot);
  }
}
