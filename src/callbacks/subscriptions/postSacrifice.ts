export type PostSacrificeRegisterParameters = [
  callback: (player: EntityPlayer, numSacrifices: int) => void,
];

const subscriptions: PostSacrificeRegisterParameters[] = [];

/** @internal */
export function postSacrificeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSacrificeRegister(
  ...args: PostSacrificeRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postSacrificeFire(
  player: EntityPlayer,
  numSacrifices: int,
): void {
  for (const [callback] of subscriptions) {
    callback(player, numSacrifices);
  }
}
