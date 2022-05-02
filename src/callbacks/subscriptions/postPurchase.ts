export type PostPurchaseRegisterParameters = [
  callback: (player: EntityPlayer, pickup: EntityPickup) => void,
  pickupVariant?: PickupVariant | int,
  pickupSubType?: int,
];

const subscriptions: PostPurchaseRegisterParameters[] = [];

/** @internal */
export function postPurchaseHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPurchaseRegister(
  ...args: PostPurchaseRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPurchaseFire(
  player: EntityPlayer,
  pickup: EntityPickup,
): void {
  for (const [callback] of subscriptions) {
    callback(player, pickup);
  }
}
