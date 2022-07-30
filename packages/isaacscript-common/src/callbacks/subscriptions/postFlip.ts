export type PostFlipRegisterParameters = [
  callback: (newLazarus: EntityPlayer, oldLazarus: EntityPlayer) => void,
];

const subscriptions: PostFlipRegisterParameters[] = [];

export function postFlipHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFlipRegister(...args: PostFlipRegisterParameters): void {
  subscriptions.push(args);
}

export function postFlipFire(
  newLazarus: EntityPlayer,
  oldLazarus: EntityPlayer,
): void {
  for (const [callback] of subscriptions) {
    callback(newLazarus, oldLazarus);
  }
}
