export type PostFirstFlipRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostFirstFlipRegisterParameters[] = [];

/** @internal */
export function postFirstFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFirstFlipRegister(
  ...args: PostFirstFlipRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postFirstFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
