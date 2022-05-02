export type PreCustomReviveRegisterParameters = [
  callback: (player: EntityPlayer) => int | void,
];

const subscriptions: PreCustomReviveRegisterParameters[] = [];

/** @internal */
export function preCustomReviveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preCustomReviveRegister(
  ...args: PreCustomReviveRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function preCustomReviveFire(player: EntityPlayer): int | void {
  for (const [callback] of subscriptions) {
    const revivalType = callback(player);
    if (revivalType !== undefined) {
      return revivalType;
    }
  }

  return undefined;
}
