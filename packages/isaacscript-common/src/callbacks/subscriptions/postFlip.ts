export type PostFlipRegisterParameters = [
  callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
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
export function postFlipFire(
  newLazarus: EntityPlayer,
  oldLazarus: EntityPlayer,
): void {
  for (const [callback] of subscriptions) {
    callback(newLazarus, oldLazarus);
  }
}
