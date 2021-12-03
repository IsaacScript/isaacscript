export type PreCustomReviveCallbackType = (player: EntityPlayer) => int | void;

const subscriptions: Array<[PreCustomReviveCallbackType]> = [];

/** @internal */
export function preCustomReviveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preCustomReviveRegister(
  callback: PreCustomReviveCallbackType,
): void {
  subscriptions.push([callback]);
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
