export type PostPlayerChangeTypeCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostPlayerChangeTypeCallbackType]> = [];

export function postPlayerChangeTypeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPlayerChangeTypeRegister(
  callback: PostPlayerChangeTypeCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postPlayerChangeTypeFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
