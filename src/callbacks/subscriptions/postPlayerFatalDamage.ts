export type PostPlayerFatalDamageCallbackType = (
  player: EntityPlayer,
) => boolean | void;

const subscriptions: Array<
  [PostPlayerFatalDamageCallbackType, PlayerVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostPlayerFatalDamageCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

export function fire(player: EntityPlayer): boolean | void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    const returnValue = callback(player);
    if (returnValue === false) {
      return false;
    }
  }

  return undefined;
}
