export type PostEsauJrCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostEsauJrCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostEsauJrCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
