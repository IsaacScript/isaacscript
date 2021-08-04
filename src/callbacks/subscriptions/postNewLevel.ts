const subscriptions: Array<[() => void]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: () => void): void {
  subscriptions.push([callback]);
}

export function postNewLevel(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
