export type PostPickupStateChangedRegisterParameters = PickupRegisterParameters<
  [previousState: int, currentState: int],
  void
>;

const subscriptions: PostPickupStateChangedRegisterParameters[] = [];

/** @internal */
export function postPickupStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPickupStateChangedRegister(
  ...args: PostPickupStateChangedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPickupStateChangedFire(
  pickup: EntityPickup,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    // @ts-expect-error TypeScript isn't smart enough to treat the above checks as type narrowing.
    callback(pickup, previousState, currentState);
  }
}
