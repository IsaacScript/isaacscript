type CallbackType = (
  player: EntityPlayer,
  playerForm: PlayerForm,
  gained: boolean,
) => void;

const subscriptions: Array<[CallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: CallbackType): void {
  subscriptions.push([callback]);
}

export function fire(
  player: EntityPlayer,
  playerForm: PlayerForm,
  gained: boolean,
): void {
  for (const [callback] of subscriptions) {
    callback(player, playerForm, gained);
  }
}
