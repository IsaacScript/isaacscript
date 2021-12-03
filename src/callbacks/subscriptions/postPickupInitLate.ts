/** @internal */
export type PostPickupInitLateCallbackType = (pickup: EntityPickup) => void;

const subscriptions: Array<
  [PostPickupInitLateCallbackType, PickupVariant | int | undefined]
> = [];

/** @internal */
export function postPickupInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPickupInitLateRegister(
  callback: PostPickupInitLateCallbackType,
  pickupVariant?: PickupVariant | int,
): void {
  subscriptions.push([callback, pickupVariant]);
}

/** @internal */
export function postPickupInitLateFire(pickup: EntityPickup): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup);
  }
}
