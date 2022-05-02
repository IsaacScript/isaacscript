export type PostPlayerUpdateReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PostPlayerUpdateReorderedRegisterParameters[] = [];

/** @internal */
export function postPlayerUpdateReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerUpdateReorderedRegister(
  ...args: PostPlayerUpdateReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerUpdateReorderedFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
