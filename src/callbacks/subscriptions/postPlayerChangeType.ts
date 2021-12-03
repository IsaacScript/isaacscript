export type PostPlayerChangeTypeCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostPlayerChangeTypeCallbackType]> = [];

/** @internal */
export function postPlayerChangeTypeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerChangeTypeRegister(
  callback: PostPlayerChangeTypeCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postPlayerChangeTypeFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
