export type PreNewLevelCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PreNewLevelCallbackType]> = [];

/** @internal */
export function preNewLevelHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preNewLevelRegister(callback: PreNewLevelCallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function preNewLevelFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
