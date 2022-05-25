export type PostFirstEsauJrRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostFirstEsauJrRegisterParameters[] = [];

/** @internal */
export function postFirstEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFirstEsauJrRegister(
  ...args: PostFirstEsauJrRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postFirstEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
