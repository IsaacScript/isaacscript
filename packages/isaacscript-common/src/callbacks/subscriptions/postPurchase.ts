import { PickupVariant } from "isaac-typescript-definitions";

export type PostPurchaseRegisterParameters = [
  callback: (player: EntityPlayer, pickup: EntityPickup) => void,
  pickupVariant?: PickupVariant,
  pickupSubType?: int,
];

const subscriptions: PostPurchaseRegisterParameters[] = [];

export function postPurchaseHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPurchaseRegister(
  ...args: PostPurchaseRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPurchaseFire(
  player: EntityPlayer,
  pickup: EntityPickup,
): void {
  for (const [
    callback,
    callbackPickupVariant,
    callbackPickupSubType,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackPickupVariant !== undefined &&
      callbackPickupVariant !== pickup.Variant
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (
      callbackPickupSubType !== undefined &&
      callbackPickupSubType !== pickup.SubType
    ) {
      continue;
    }

    callback(player, pickup);
  }
}
