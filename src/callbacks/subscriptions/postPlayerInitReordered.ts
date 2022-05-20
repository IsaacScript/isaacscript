import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostPlayerInitReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerInitReorderedRegisterParameters[] = [];

/** @internal */
export function postPlayerInitReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerInitReorderedRegister(
  ...args: PostPlayerInitReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerInitReorderedFire(player: EntityPlayer): void {
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
