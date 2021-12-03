export type PreNewLevelCallbackType = () => void;

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
export function preNewLevelFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
