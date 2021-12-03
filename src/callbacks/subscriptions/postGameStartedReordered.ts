export type PostGameStartedReorderedCallbackType = (
  isContinued: boolean,
) => void;

const subscriptions: Array<[PostGameStartedReorderedCallbackType]> = [];

/** @internal */
export function postGameStartedReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGameStartedReorderedRegister(
  callback: PostGameStartedReorderedCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postGameStartedReorderedFire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
