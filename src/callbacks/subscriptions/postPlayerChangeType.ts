import { PlayerType } from "isaac-typescript-definitions";

export type PostPlayerChangeTypeRegisterParameters = [
  callback: (
    player: EntityPlayer,
    oldCharacter: PlayerType | int,
    newCharacter: PlayerType | int,
  ) => void,
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
  oldCharacter: PlayerType | int,
  newCharacter: PlayerType | int,
): void {
  for (const [callback] of subscriptions) {
    callback(player, oldCharacter, newCharacter);
  }
}
