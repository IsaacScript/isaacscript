type CallbackType = (player: EntityPlayer) => void;

export type PostFirstFlipRegisterParameters = [callback: CallbackType];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postFirstFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFirstFlipRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postFirstFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
