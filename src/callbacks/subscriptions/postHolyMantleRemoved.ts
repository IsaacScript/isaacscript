import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostHolyMantleRemovedRegisterParameters = [
  callback: (
    player: EntityPlayer,
    oldNumHolyMantles: int,
    newNumHolyMantles: int,
  ) => void,
  playerVariant?: PlayerVariant | int,
  character?: PlayerType | int,
];

const subscriptions: PostHolyMantleRemovedRegisterParameters[] = [];

/** @internal */
export function postHolyMantleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postHolyMantleRemovedRegister(
  ...args: PostHolyMantleRemovedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postHolyMantleRemovedFire(
  player: EntityPlayer,
  oldNumHolyMantles: int,
  newNumHolyMantles: int,
): void {
  const character = player.GetPlayerType();

  for (const [callback, callbackVariant, callbackCharacter] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== player.Variant) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      continue;
    }

    callback(player, oldNumHolyMantles, newNumHolyMantles);
  }
}
