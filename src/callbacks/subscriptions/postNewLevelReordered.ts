export type PostNewLevelReorderedCallbackType = () => void;

const subscriptions: Array<[PostNewLevelReorderedCallbackType]> = [];

export function postNewLevelReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNewLevelReorderedRegister(
  callback: PostNewLevelReorderedCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postNewLevelReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
