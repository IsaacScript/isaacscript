import { HealthType } from "../../types/HealthType";

export type PostPlayerChangeHealthCallbackType = (
  player: EntityPlayer,
  healthType: HealthType,
  amount: int,
) => void;

const subscriptions: Array<
  [PostPlayerChangeHealthCallbackType, PlayerVariant | undefined]
> = [];

/** @internal */
export function postPlayerChangeHealthHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerChangeHealthRegister(
  callback: PostPlayerChangeHealthCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

/** @internal */
export function postPlayerChangeHealthFire(
  player: EntityPlayer,
  healthType: HealthType,
  amount: int,
): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player, healthType, amount);
  }
}
