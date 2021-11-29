export type PostFirstFlipCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostFirstFlipCallbackType]> = [];

export function postFirstFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFirstFlipRegister(
  callback: PostFirstFlipCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postFirstFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
