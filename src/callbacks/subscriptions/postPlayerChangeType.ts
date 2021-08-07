export type PostPlayerChangeTypeCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostPlayerChangeTypeCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostPlayerChangeTypeCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
