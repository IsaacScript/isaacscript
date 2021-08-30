export type PostPurchaseCallbackType = (
  player: EntityPlayer,
  pickupVariant: PickupVariant,
  pickupSubType: int,
  pickupPrice: int,
) => void;

const subscriptions: Array<[PostPurchaseCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostPurchaseCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(
  player: EntityPlayer,
  pickupVariant: PickupVariant,
  pickupSubType: int,
  pickupPrice: int,
): void {
  for (const [callback] of subscriptions) {
    callback(player, pickupVariant, pickupSubType, pickupPrice);
  }
}
