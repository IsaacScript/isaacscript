import { PickupVariant } from "isaac-typescript-definitions";

export type PostPickupInitFirstRegisterParameters = [
  callback: (pickup: EntityPickup) => void,
  pickupVariant?: PickupVariant,
];

const subscriptions: PostPickupInitFirstRegisterParameters[] = [];

export function postPickupInitFirstHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPickupInitFirstRegister(
  ...args: PostPickupInitFirstRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPickupInitFirstFire(pickup: EntityPickup): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup);
  }
}
