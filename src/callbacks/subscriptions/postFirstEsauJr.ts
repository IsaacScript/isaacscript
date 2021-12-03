/** @internal */
export type PostFirstEsauJrCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFirstEsauJrCallbackType]> = [];

/** @internal */
export function postFirstEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFirstEsauJrRegister(
  callback: PostFirstEsauJrCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postFirstEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
