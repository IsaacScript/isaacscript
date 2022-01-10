export type PreBerserkDeathCallbackType = (
  player: EntityPlayer,
) => boolean | void;

const subscriptions: Array<
  [PreBerserkDeathCallbackType, PlayerVariant | undefined]
> = [];

/** @internal */
export function preBerserkDeathHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preBerserkDeathRegister(
  callback: PreBerserkDeathCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

/** @internal */
export function preBerserkDeathFire(player: EntityPlayer): boolean | void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }

  return undefined;
}
