export type PostPickupInitLateRegisterParameters = PickupRegisterParameters<
  [],
  void
>;

const subscriptions: PostPickupInitLateRegisterParameters[] = [];

/** @internal */
export function postPickupInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPickupInitLateRegister(
  ...args: PostPickupInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPickupInitLateFire(pickup: EntityPickup): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    // @ts-expect-error TypeScript isn't smart enough to treat the above checks as type narrowing.
    callback(pickup);
  }
}
