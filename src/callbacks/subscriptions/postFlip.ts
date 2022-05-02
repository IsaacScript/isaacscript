type CallbackType = (player: EntityPlayer) => void;

export type PostFlipRegisterParameters = [callback: CallbackType];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFlipRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
