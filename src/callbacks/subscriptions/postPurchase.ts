export type PostPurchaseCallbackType = (
  player: EntityPlayer,
  pickupVariant: PickupVariant | int,
  pickupSubType: int,
  pickupPrice: int,
) => void;

const subscriptions: Array<
  [PostPurchaseCallbackType, PickupVariant | int | undefined, int | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostPurchaseCallbackType,
  pickupVariant?: PickupVariant | int,
  pickupSubType?: int,
): void {
  subscriptions.push([callback, pickupVariant, pickupSubType]);
}

export function fire(
  player: EntityPlayer,
  pickupVariant: PickupVariant | int,
  pickupSubType: int,
  pickupPrice: int,
): void {
  for (const [callback] of subscriptions) {
    callback(player, pickupVariant, pickupSubType, pickupPrice);
  }
}
