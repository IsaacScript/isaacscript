export type PostEsauJrRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostEsauJrRegisterParameters[] = [];

export function postEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postEsauJrRegister(
  ...args: PostEsauJrRegisterParameters
): void {
  subscriptions.push(args);
}

export function postEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
