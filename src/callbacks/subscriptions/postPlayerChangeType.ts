import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostPlayerChangeTypeRegisterParameters = [
  callback: (
    player: EntityPlayer,
    oldCharacter: PlayerType,
    newCharacter: PlayerType,
  ) => void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PostPlayerChangeTypeRegisterParameters[] = [];

/** @internal */
export function postPlayerChangeTypeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerChangeTypeRegister(
  ...args: PostPlayerChangeTypeRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerChangeTypeFire(
  player: EntityPlayer,
  oldCharacter: PlayerType,
  newCharacter: PlayerType,
): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player, oldCharacter, newCharacter);
  }
}
