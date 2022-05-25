import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostSacrificeRegisterParameters = [
  callback: (player: EntityPlayer, numSacrifices: int) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostSacrificeRegisterParameters[] = [];

/** @internal */
export function postSacrificeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSacrificeRegister(
  ...args: PostSacrificeRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postSacrificeFire(
  player: EntityPlayer,
  numSacrifices: int,
): void {
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

    callback(player, numSacrifices);
  }
}
