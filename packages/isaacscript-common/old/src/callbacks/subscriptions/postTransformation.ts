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

/** @internal */
export function postTransformationHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTransformationRegister(
  ...args: PostTransformationRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
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
