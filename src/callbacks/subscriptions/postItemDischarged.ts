import { ActiveSlot, CollectibleType } from "isaac-typescript-definitions";

export type PostItemDischargedRegisterParameters = [
  callback: (
    player: EntityPlayer,
    collectibleType: CollectibleType | int,
    activeSlot: ActiveSlot,
  ) => void,
  collectibleType?: CollectibleType | int,
];

const subscriptions: PostItemDischargedRegisterParameters[] = [];

/** @internal */
export function postItemDischargeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postItemDischargeRegister(
  ...args: PostItemDischargedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postItemDischargeFire(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
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
