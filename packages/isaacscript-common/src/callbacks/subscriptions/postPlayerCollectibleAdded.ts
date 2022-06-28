import {
  CollectibleType,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";

export type PostPlayerCollectibleAddedRegisterParameters = [
  callback: (player: EntityPlayer, collectibleType: CollectibleType) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerCollectibleAddedRegisterParameters[] = [];

/** @internal */
export function postPlayerCollectibleAddedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerCollectibleAddedRegister(
  ...args: PostPlayerCollectibleAddedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerCollectibleAddedFire(
  player: EntityPlayer,
  collectibleType: CollectibleType,
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

    callback(player, collectibleType);
  }
}
