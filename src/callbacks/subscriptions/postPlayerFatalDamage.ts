export type PostPlayerFatalDamageCallbackType = (
  player: EntityPlayer,
) => boolean | void;

const subscriptions: Array<
  [PostPlayerFatalDamageCallbackType, PlayerVariant | undefined]
> = [];

export function postPlayerFatalDamageHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerFatalDamageRegister(
  callback: PostPlayerFatalDamageCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

export function postPlayerFatalDamageFire(
  player: EntityPlayer,
): boolean | void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    const shouldSustainDeath = callback(player);
    if (shouldSustainDeath !== undefined) {
      return shouldSustainDeath;
    }
  }

  return undefined;
}
