import { DiceFloorSubType } from "isaac-typescript-definitions";

export type PostDiceRoomActivatedRegisterParameters = [
  callback: (player: EntityPlayer, diceFloorSubType: DiceFloorSubType) => void,
  diceFloorSubType?: DiceFloorSubType,
];

const subscriptions: PostDiceRoomActivatedRegisterParameters[] = [];

/** @internal */
export function postDiceRoomActivatedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postDiceRoomActivatedRegister(
  ...args: PostDiceRoomActivatedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postDiceRoomActivatedFire(
  player: EntityPlayer,
  diceFloorSubType: DiceFloorSubType,
): void {
  for (const [callback, callbackDiceFloorSubType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackDiceFloorSubType !== undefined &&
      callbackDiceFloorSubType !== diceFloorSubType
    ) {
      continue;
    }

    callback(player, diceFloorSubType);
  }
}
