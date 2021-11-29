export type PostPlayerUpdateReorderedCallbackType = (
  player: EntityPlayer,
) => void;

const subscriptions: Array<
  [PostPlayerUpdateReorderedCallbackType, PlayerVariant | undefined]
> = [];

export function postPlayerUpdateReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerUpdateReorderedRegister(
  callback: PostPlayerUpdateReorderedCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

export function postPlayerUpdateReorderedFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
