/** @internal */
export type PostTransformationCallbackType = (
  player: EntityPlayer,
  playerForm: PlayerForm,
  hasForm: boolean,
) => void;

const subscriptions: Array<
  [PostTransformationCallbackType, PlayerForm | undefined]
> = [];

/** @internal */
export function postTransformationHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTransformationRegister(
  callback: PostTransformationCallbackType,
  playerForm?: PlayerForm,
): void {
  subscriptions.push([callback, playerForm]);
}

/** @internal */
export function postTransformationFire(
  player: EntityPlayer,
  playerForm: PlayerForm,
  hasForm: boolean,
): void {
  for (const [callback, callbackPlayerForm] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (callbackPlayerForm !== undefined && callbackPlayerForm !== playerForm) {
      continue;
    }

    callback(player, playerForm, hasForm);
  }
}
