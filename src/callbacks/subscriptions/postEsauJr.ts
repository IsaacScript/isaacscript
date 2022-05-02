type CallbackType = (player: EntityPlayer) => void;

export type PostEsauJrRegisterParameters = [callback: CallbackType];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEsauJrRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
