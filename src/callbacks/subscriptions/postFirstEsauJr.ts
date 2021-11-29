export type PostFirstEsauJrCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFirstEsauJrCallbackType]> = [];

export function postFirstEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFirstEsauJrRegister(
  callback: PostFirstEsauJrCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postFirstEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
