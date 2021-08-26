export type PostCustomReviveCallbackType = (
  player: EntityPlayer,
  revivalType: int,
) => void;

const subscriptions: Array<[PostCustomReviveCallbackType, int | undefined]> =
  [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostCustomReviveCallbackType,
  revivalType?: int,
): void {
  subscriptions.push([callback, revivalType]);
}

export function fire(player: EntityPlayer, revivalType: int): void {
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
