export type PreNewLevelCallbackType = () => void;

const subscriptions: Array<[PreNewLevelCallbackType]> = [];

export function preNewLevelHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function preNewLevelRegister(callback: PreNewLevelCallbackType): void {
  subscriptions.push([callback]);
}

export function preNewLevelFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
