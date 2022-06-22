export type PostPickupInitFirstRegisterParameters = PickupRegisterParameters<
  [],
  void
>;

const subscriptions: PostPickupInitFirstRegisterParameters[] = [];

/** @internal */
export function postPickupInitFirstHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPickupInitFirstRegister(
  ...args: PostPickupInitFirstRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPickupInitFirstFire(pickup: EntityPickup): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    // @ts-expect-error TypeScript isn't smart enough to treat the above checks as type narrowing.
    callback(pickup);
  }
}
