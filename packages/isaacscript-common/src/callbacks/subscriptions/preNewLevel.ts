export type PreNewLevelRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PreNewLevelRegisterParameters[] = [];

export function preNewLevelHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function preNewLevelRegister(
  ...args: PreNewLevelRegisterParameters
): void {
  subscriptions.push(args);
}

export function preNewLevelFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
