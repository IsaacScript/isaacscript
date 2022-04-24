export type PostPickupStateChangedCallbackType = (
  pickup: EntityPickup,
  previousState: int,
  currentState: int,
) => void;

const subscriptions: Array<
  [PostPickupStateChangedCallbackType, PickupVariant | int | undefined]
> = [];

/** @internal */
export function postPickupStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPickupStateChangedRegister(
  callback: PostPickupStateChangedCallbackType,
  pickupVariant?: PickupVariant | int,
): void {
  subscriptions.push([callback, pickupVariant]);
}

/** @internal */
export function postPickupStateChangedFire(
  pickup: EntityPickup,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup, previousState, currentState);
  }
}
