import {
  CollectibleType,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";

export type PostPlayerCollectibleRemovedRegisterParameters = [
  callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerCollectibleRemovedRegisterParameters[] = [];

/** @internal */
export function postPlayerCollectibleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerCollectibleRemovedRegister(
  ...args: PostPlayerCollectibleRemovedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerCollectibleRemovedFire(
  player: EntityPlayer,
  collectibleType: CollectibleType,
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

    callback(player, collectibleType);
  }
}
