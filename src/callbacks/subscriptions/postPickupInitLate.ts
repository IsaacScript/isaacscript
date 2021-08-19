export type PostPickupInitLateCallbackType = (pickup: EntityPickup) => void;

const subscriptions: Array<
  [PostPickupInitLateCallbackType, PickupVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostPickupInitLateCallbackType,
  pickupVariant?: PickupVariant,
): void {
  subscriptions.push([callback, pickupVariant]);
}

export function fire(pickup: EntityPickup): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup);
  }
}
