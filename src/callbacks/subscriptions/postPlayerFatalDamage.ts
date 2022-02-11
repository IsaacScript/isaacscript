export type PostPlayerFatalDamageCallbackType = (
  player: EntityPlayer,
  damageAmount: float,
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
) => boolean | void;

const subscriptions: Array<
  [PostPlayerFatalDamageCallbackType, PlayerVariant | undefined]
> = [];

/** @internal */
export function postPlayerFatalDamageHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerFatalDamageRegister(
  callback: PostPlayerFatalDamageCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

/** @internal */
export function postPlayerFatalDamageFire(
  player: EntityPlayer,
  damageAmount: float,
  damageFlags: int,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean | void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    const shouldSustainDeath = callback(
      player,
      damageAmount,
      damageFlags,
      damageSource,
      damageCountdownFrames,
    );
    if (shouldSustainDeath !== undefined) {
      return shouldSustainDeath;
    }
  }

  return undefined;
}
