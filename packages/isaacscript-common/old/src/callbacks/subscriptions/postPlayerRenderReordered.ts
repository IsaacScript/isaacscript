import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostPlayerRenderReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerRenderReorderedRegisterParameters[] = [];

/** @internal */
export function postPlayerRenderReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerRenderReorderedRegister(
  ...args: PostPlayerRenderReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerRenderReorderedFire(player: EntityPlayer): void {
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
