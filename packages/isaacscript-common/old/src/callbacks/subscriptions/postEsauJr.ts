export type PostEsauJrRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostEsauJrRegisterParameters[] = [];

/** @internal */
export function postEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEsauJrRegister(
  ...args: PostEsauJrRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
