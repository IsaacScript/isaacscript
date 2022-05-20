export type PostPickupCollectRegisterParameters = PickupRegisterParameters<
  [player: EntityPlayer],
  void
>;

const subscriptions: PostPickupCollectRegisterParameters[] = [];

/** @internal */
export function postPickupCollectHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPickupCollectRegister(
  ...args: PostPickupCollectRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPickupCollectFire(
  pickup: EntityPickup,
  player: EntityPlayer,
): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    // @ts-expect-error TypeScript isn't smart enough to treat the above checks as type narrowing.
    callback(pickup, player);
  }
}
