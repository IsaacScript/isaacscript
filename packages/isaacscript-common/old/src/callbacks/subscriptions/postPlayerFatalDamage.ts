import {
  DamageFlag,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";

export type PostPlayerFatalDamageRegisterParameters = [
  callback: (
    player: EntityPlayer,
    damageAmount: float,
    damageFlags: BitFlags<DamageFlag>,
    damageSource: EntityRef,
    damageCountdownFrames: int,
  ) => boolean | void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
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
  const character = player.GetPlayerType();

  for (const [callback, playerVariant, callbackCharacter] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (callbackCharacter !== undefined && callbackCharacter !== character) {
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
