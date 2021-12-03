export type PostNewLevelReorderedCallbackType = () => void;

const subscriptions: Array<[PostNewLevelReorderedCallbackType]> = [];

/** @internal */
export function postNewLevelReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNewLevelReorderedRegister(
  callback: PostNewLevelReorderedCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postNewLevelReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
