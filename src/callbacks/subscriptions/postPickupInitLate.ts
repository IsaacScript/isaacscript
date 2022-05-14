import { PickupVariant } from "isaac-typescript-definitions";

export type PostPickupInitLateRegisterParameters = [
  callback: (pickup: EntityPickup) => void,
  pickupVariant?: PickupVariant | int,
];

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
    // Handle the optional 2nd callback argument
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup);
  }
}
