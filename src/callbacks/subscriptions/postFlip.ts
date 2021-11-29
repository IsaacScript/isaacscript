export type PostFlipCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFlipCallbackType]> = [];

export function postFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFlipRegister(callback: PostFlipCallbackType): void {
  subscriptions.push([callback]);
}

export function postFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
