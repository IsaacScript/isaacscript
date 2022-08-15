import {
  DamageFlag,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";

export type PostPlayerFatalDamageRegisterParameters = [
  callback: (
    player: EntityPlayer,
    amount: float,
    damageFlags: BitFlags<DamageFlag>,
    source: EntityRef,
    countdownFrames: int,
  ) => boolean | undefined,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerFatalDamageRegisterParameters[] = [];

export function postPlayerFatalDamageHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerFatalDamageRegister(
  ...args: PostPlayerFatalDamageRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPlayerFatalDamageFire(
  player: EntityPlayer,
  amount: float,
  damageFlags: BitFlags<DamageFlag>,
  source: EntityRef,
  countdownFrames: int,
): boolean | undefined {
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
      amount,
      damageFlags,
      source,
      countdownFrames,
    );

    if (shouldSustainDeath !== undefined) {
      return shouldSustainDeath;
    }
  }

  return undefined;
}
