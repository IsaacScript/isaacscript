import { PickupVariant } from "isaac-typescript-definitions";

export type PostPickupCollectRegisterParameters = [
  callback: (pickup: EntityPickup, player: EntityPlayer) => void,
  pickupVariant?: PickupVariant,
];

const subscriptions: PostPickupCollectRegisterParameters[] = [];

export function postPickupCollectHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPickupCollectRegister(
  ...args: PostPickupCollectRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPickupCollectFire(
  pickup: EntityPickup,
  player: EntityPlayer,
): void {
  for (const [callback, pickupVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (pickupVariant !== undefined && pickupVariant !== pickup.Variant) {
      continue;
    }

    callback(pickup, player);
  }
}
