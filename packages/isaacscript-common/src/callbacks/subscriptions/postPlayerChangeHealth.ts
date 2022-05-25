import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";
import { HealthType } from "../../enums/HealthType";

export type PostPlayerChangeHealthRegisterParameters = [
  callback: (player: EntityPlayer, healthType: HealthType, amount: int) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPlayerChangeHealthRegisterParameters[] = [];

/** @internal */
export function postPlayerChangeHealthHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerChangeHealthRegister(
  ...args: PostPlayerChangeHealthRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerChangeHealthFire(
  player: EntityPlayer,
  healthType: HealthType,
  amount: int,
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

    callback(player, healthType, amount);
  }
}
