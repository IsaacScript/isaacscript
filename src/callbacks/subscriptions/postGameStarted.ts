export type PostGameStartedCallbackType = (isContinued: boolean) => void;

const subscriptions: Array<[PostGameStartedCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostGameStartedCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
