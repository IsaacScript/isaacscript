const subscriptions: Array<[(isContinued: boolean) => void]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: (isContinued: boolean) => void): void {
  subscriptions.push([callback]);
}

export function postGameStarted(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
