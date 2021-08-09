export type PostGameStartedReorderedCallbackType = (
  isContinued: boolean,
) => void;

const subscriptions: Array<[PostGameStartedReorderedCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostGameStartedReorderedCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
