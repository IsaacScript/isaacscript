export type PreCustomReviveCallbackType = (player: EntityPlayer) => int | void;

const subscriptions: Array<[PreCustomReviveCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PreCustomReviveCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer): int | void {
  for (const [callback] of subscriptions) {
    const revivalType = callback(player);
    if (revivalType !== undefined) {
      return revivalType;
    }
  }

  return undefined;
}
