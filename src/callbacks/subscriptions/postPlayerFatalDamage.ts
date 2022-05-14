import { DamageFlag, PlayerVariant } from "isaac-typescript-definitions";

export type PostPlayerFatalDamageRegisterParameters = [
  callback: (
    player: EntityPlayer,
    damageAmount: float,
    damageFlags: BitFlags<DamageFlag>,
    damageSource: EntityRef,
    damageCountdownFrames: int,
  ) => boolean | void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PostPlayerFatalDamageRegisterParameters[] = [];

/** @internal */
export function postPlayerFatalDamageHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerFatalDamageRegister(
  ...args: PostPlayerFatalDamageRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerFatalDamageFire(
  player: EntityPlayer,
  damageAmount: float,
  damageFlags: BitFlags<DamageFlag>,
  damageSource: EntityRef,
  damageCountdownFrames: int,
): boolean | void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
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
