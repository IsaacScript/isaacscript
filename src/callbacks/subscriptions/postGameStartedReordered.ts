export type PostGameStartedReorderedCallbackType = (
  isContinued: boolean,
) => void;

const subscriptions: Array<[PostGameStartedReorderedCallbackType]> = [];

export function postGameStartedReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGameStartedReorderedRegister(
  callback: PostGameStartedReorderedCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postGameStartedReorderedFire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
