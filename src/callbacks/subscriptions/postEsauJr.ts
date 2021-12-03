export type PostEsauJrCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostEsauJrCallbackType]> = [];

/** @internal */
export function postEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEsauJrRegister(callback: PostEsauJrCallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
