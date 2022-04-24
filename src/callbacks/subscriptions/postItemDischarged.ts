export type PostItemDischargedCallbackType = (
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
  activeSlot: ActiveSlot,
) => void;

const subscriptions: Array<
  [PostItemDischargedCallbackType, CollectibleType | int | undefined]
> = [];

/** @internal */
export function postItemDischargeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postItemDischargeRegister(
  callback: PostItemDischargedCallbackType,
  activeSlot?: ActiveSlot,
): void {
  subscriptions.push([callback, activeSlot]);
}

/** @internal */
export function postItemDischargeFire(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
  activeSlot: ActiveSlot,
): void {
  for (const [callback, callbackCollectibleType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackCollectibleType !== undefined &&
      callbackCollectibleType !== collectibleType
    ) {
      continue;
    }

    callback(player, collectibleType, activeSlot);
  }
}
