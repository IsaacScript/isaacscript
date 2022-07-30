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
  for (const [callback] of subscriptions) {
    callback(player, pickup);
  }
}
