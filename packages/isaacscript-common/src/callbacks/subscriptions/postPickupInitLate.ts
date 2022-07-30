import { PickupVariant } from "isaac-typescript-definitions";

export type PostPickupInitLateRegisterParameters = [
  callback: (pickup: EntityPickup) => void,
  pickupVariant?: PickupVariant,
];

const subscriptions: PostPickupInitLateRegisterParameters[] = [];

export function postPickupInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPickupInitLateRegister(
  ...args: PostPickupInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPickupInitLateFire(pickup: EntityPickup): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup);
  }
}
