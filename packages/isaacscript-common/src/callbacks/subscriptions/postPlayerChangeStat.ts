import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";
import { StatType } from "../../enums/StatType";
import { StatTypeType } from "../../interfaces/StatTypeType";
import { PossibleStatType } from "../../types/PossibleStatType";

export type PostPlayerChangeStatRegisterParameters = [
  callback: (
    player: EntityPlayer,
    statType: StatType,
    difference: int,
    oldValue: PossibleStatType,
    newValue: PossibleStatType,
  ) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerChangeStatRegisterParameters[] = [];

export function postPlayerChangeStatHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerChangeStatRegister(
  ...args: PostPlayerChangeStatRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPlayerChangeStatFire<T extends StatType>(
  player: EntityPlayer,
  statType: T,
  difference: int,
  oldValue: StatTypeType[T],
  newValue: StatTypeType[T],
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

    callback(player, statType, difference, oldValue, newValue);
  }
}
