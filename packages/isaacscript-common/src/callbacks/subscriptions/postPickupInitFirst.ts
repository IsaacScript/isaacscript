import { PickupVariant } from "isaac-typescript-definitions";

export type PostPickupInitFirstRegisterParameters = [
  callback: (pickup: EntityPickup) => void,
  pickupVariant?: PickupVariant,
];

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

    callback(pickup);
  }
}
