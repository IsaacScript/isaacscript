import { PickupDescription } from "../../types/PickupDescription";

export type PostPurchaseCallbackType = (
  player: EntityPlayer,
  pickupDescription: PickupDescription,
) => void;

const subscriptions: Array<
  [PostPurchaseCallbackType, PickupVariant | int | undefined, int | undefined]
> = [];

/** @internal */
export function postPurchaseHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPurchaseRegister(
  callback: PostPurchaseCallbackType,
  pickupVariant?: PickupVariant | int,
  pickupSubType?: int,
): void {
  subscriptions.push([callback, pickupVariant, pickupSubType]);
}

/** @internal */
export function postPurchaseFire(
  player: EntityPlayer,
  pickupDescription: PickupDescription,
): void {
  for (const [callback] of subscriptions) {
    callback(player, pickupDescription);
  }
}
