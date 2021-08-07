export type PostFirstEsauJrCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFirstEsauJrCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostFirstEsauJrCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
