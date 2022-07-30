export type PostFirstEsauJrRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostFirstEsauJrRegisterParameters[] = [];

export function postFirstEsauJrHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFirstEsauJrRegister(
  ...args: PostFirstEsauJrRegisterParameters
): void {
  subscriptions.push(args);
}

export function postFirstEsauJrFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
