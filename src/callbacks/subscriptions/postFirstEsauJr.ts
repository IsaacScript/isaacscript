type CallbackType = (player: EntityPlayer) => void;

export type PostFirstEsauJrRegisterParameters = [callback: CallbackType];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postFirstEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFirstEsauJrRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postFirstEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
