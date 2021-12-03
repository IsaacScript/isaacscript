export type PostCustomReviveCallbackType = (
  player: EntityPlayer,
  revivalType: int,
) => void;

const subscriptions: Array<[PostCustomReviveCallbackType, int | undefined]> =
  [];

/** @internal */
export function postCustomReviveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCustomReviveRegister(
  callback: PostCustomReviveCallbackType,
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
