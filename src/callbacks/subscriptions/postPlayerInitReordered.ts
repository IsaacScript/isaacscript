export type PostPlayerInitReorderedCallbackType = (
  player: EntityPlayer,
) => void;

const subscriptions: Array<
  [PostPlayerInitReorderedCallbackType, PlayerVariant | undefined]
> = [];

/** @internal */
export function postPlayerInitReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerInitReorderedRegister(
  callback: PostPlayerInitReorderedCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

/** @internal */
export function postPlayerInitReorderedFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
