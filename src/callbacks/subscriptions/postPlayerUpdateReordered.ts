import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostPlayerUpdateReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
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
}
