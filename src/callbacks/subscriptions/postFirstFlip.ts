/** @internal */
export type PostFirstFlipCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFirstFlipCallbackType]> = [];

/** @internal */
export function postFirstFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFirstFlipRegister(
  callback: PostFirstFlipCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postFirstFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
