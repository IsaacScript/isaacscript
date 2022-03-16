export type PostFlipCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFlipCallbackType]> = [];

/** @internal */
export function postFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFlipRegister(callback: PostFlipCallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
