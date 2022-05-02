export type PostPlayerRenderReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PostPlayerRenderReorderedRegisterParameters[] = [];

/** @internal */
export function postPlayerRenderReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerRenderReorderedRegister(
  ...args: PostPlayerRenderReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerRenderReorderedFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
