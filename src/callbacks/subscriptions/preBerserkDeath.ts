import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PreBerserkDeathRegisterParameters = [
  callback: (player: EntityPlayer) => boolean | void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PreBerserkDeathRegisterParameters[] = [];

/** @internal */
export function preBerserkDeathHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preBerserkDeathRegister(
  ...args: PreBerserkDeathRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function preBerserkDeathFire(player: EntityPlayer): boolean | void {
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

    callback(player);
  }

  return undefined;
}
