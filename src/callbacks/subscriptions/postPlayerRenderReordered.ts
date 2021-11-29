export type PostPlayerRenderReorderedCallbackType = (
  player: EntityPlayer,
) => void;

const subscriptions: Array<
  [PostPlayerRenderReorderedCallbackType, PlayerVariant | undefined]
> = [];

export function postPlayerRenderReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerRenderReorderedRegister(
  callback: PostPlayerRenderReorderedCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

export function postPlayerRenderReorderedFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
