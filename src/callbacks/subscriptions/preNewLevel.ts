export type PreNewLevelRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PreNewLevelRegisterParameters[] = [];

/** @internal */
export function preNewLevelHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preNewLevelRegister(
  ...args: PreNewLevelRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function preNewLevelFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
