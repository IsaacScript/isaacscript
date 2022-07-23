export type PostFirstFlipRegisterParameters = [
  callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
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
export function postFirstFlipFire(
  newLazarus: EntityPlayer,
  oldLazarus: EntityPlayer,
): void {
  for (const [callback] of subscriptions) {
    callback(newLazarus, oldLazarus);
  }
}
