type CallbackType = (
  player: EntityPlayer,
  playerForm: PlayerForm,
  hasForm: boolean,
) => void;

const subscriptions: Array<[CallbackType, PlayerForm | undefined]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: CallbackType,
  playerForm?: PlayerForm,
): void {
  subscriptions.push([callback, playerForm]);
}

export function fire(
  player: EntityPlayer,
  playerForm: PlayerForm,
  hasForm: boolean,
): void {
  for (const [callback, callbackPlayerForm] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (callbackPlayerForm !== undefined && callbackPlayerForm !== playerForm) {
      return;
    }

    callback(player, playerForm, hasForm);
  }
}
