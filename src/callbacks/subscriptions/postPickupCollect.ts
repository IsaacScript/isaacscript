export type PostPickupCollectCallbackType = (
  pickup: EntityPickup,
  player: EntityPlayer,
) => void;

const subscriptions: Array<
  [PostPickupCollectCallbackType, PickupVariant | int | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostPickupCollectCallbackType,
  pickupVariant?: PickupVariant | int,
): void {
  subscriptions.push([callback, pickupVariant]);
}

export function fire(pickup: EntityPickup, player: EntityPlayer): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup, player);
  }
}
