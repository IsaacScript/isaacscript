/** @internal */
export type PostPlayerInitLateCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<
  [PostPlayerInitLateCallbackType, PlayerVariant | undefined]
> = [];

/** @internal */
export function postPlayerInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerInitLateRegister(
  callback: PostPlayerInitLateCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

/** @internal */
export function postPlayerInitLateFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
