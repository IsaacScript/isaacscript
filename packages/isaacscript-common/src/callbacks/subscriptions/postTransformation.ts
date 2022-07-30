import { PlayerForm } from "isaac-typescript-definitions";

export type PostTransformationRegisterParameters = [
  callback: (
    player: EntityPlayer,
    playerForm: PlayerForm,
    hasForm: boolean,
  ) => void,
  playerForm?: PlayerForm,
];

const subscriptions: PostTransformationRegisterParameters[] = [];

export function postTransformationHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postTransformationRegister(
  ...args: PostTransformationRegisterParameters
): void {
  subscriptions.push(args);
}

export function postTransformationFire(
  player: EntityPlayer,
  playerForm: PlayerForm,
  hasForm: boolean,
): void {
  for (const [callback, callbackPlayerForm] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackPlayerForm !== undefined && callbackPlayerForm !== playerForm) {
      continue;
    }

    callback(player, playerForm, hasForm);
  }
}
