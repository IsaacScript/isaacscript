export type PostFirstFlipCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFirstFlipCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostFirstFlipCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
