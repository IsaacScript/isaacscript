import { PickupVariant } from "isaac-typescript-definitions";

export type PostPickupStateChangedRegisterParameters = [
  callback: (
    pickup: EntityPickup,
    previousState: int,
    currentState: int,
  ) => void,
  pickupVariant?: PickupVariant,
];

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

    callback(pickup, previousState, currentState);
  }
}
