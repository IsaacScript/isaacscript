import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostHolyMantleRemovedRegisterParameters = [
  callback: (
    player: EntityPlayer,
    oldNumHolyMantles: int,
    newNumHolyMantles: int,
  ) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostHolyMantleRemovedRegisterParameters[] = [];

export function postHolyMantleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postHolyMantleRemovedRegister(
  ...args: PostHolyMantleRemovedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postHolyMantleRemovedFire(
  player: EntityPlayer,
  oldNumHolyMantles: int,
  newNumHolyMantles: int,
): void {
  const character = player.GetPlayerType();

  for (const [
    callback,
    callbackPlayerVariant,
    callbackCharacter,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackPlayerVariant !== undefined &&
      callbackPlayerVariant !== player.Variant
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      continue;
    }

    callback(player, oldNumHolyMantles, newNumHolyMantles);
  }
}
