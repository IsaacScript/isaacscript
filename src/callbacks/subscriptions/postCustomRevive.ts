type CallbackType = (player: EntityPlayer, revivalType: int) => void;

export type PostCustomReviveRegisterParameters = [
  callback: CallbackType,
  revivalType?: int,
];

const subscriptions: Array<[CallbackType, int | undefined]> = [];

/** @internal */
export function postCustomReviveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCustomReviveRegister(
  callback: CallbackType,
  revivalType?: int,
): void {
  subscriptions.push([callback, revivalType]);
}

/** @internal */
export function postCustomReviveFire(
  player: EntityPlayer,
  revivalType: int,
): void {
  for (const [callback, callbackRevivalType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackRevivalType !== undefined &&
      callbackRevivalType !== revivalType
    ) {
      continue;
    }

    callback(player, revivalType);
  }
}
