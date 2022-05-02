export type PostCustomReviveRegisterParameters = [
  callback: (player: EntityPlayer, revivalType: int) => void,
  revivalType?: int,
];

const subscriptions: PostCustomReviveRegisterParameters[] = [];

/** @internal */
export function postCustomReviveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCustomReviveRegister(
  ...args: PostCustomReviveRegisterParameters
): void {
  subscriptions.push(args);
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
