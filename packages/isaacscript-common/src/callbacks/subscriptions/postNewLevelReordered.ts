export type PostNewLevelReorderedRegisterParameters = [callback: () => void];

const subscriptions: PostNewLevelReorderedRegisterParameters[] = [];

/** @internal */
export function postNewLevelReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNewLevelReorderedRegister(
  ...args: PostNewLevelReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postNewLevelReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
