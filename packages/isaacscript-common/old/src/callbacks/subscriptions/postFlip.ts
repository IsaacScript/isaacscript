export type PostFlipRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostFlipRegisterParameters[] = [];

/** @internal */
export function postFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFlipRegister(...args: PostFlipRegisterParameters): void {
  subscriptions.push(args);
}

/** @internal */
export function postFlipFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
