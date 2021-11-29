export type PostEsauJrCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostEsauJrCallbackType]> = [];

export function postEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postEsauJrRegister(callback: PostEsauJrCallbackType): void {
  subscriptions.push([callback]);
}

export function postEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
