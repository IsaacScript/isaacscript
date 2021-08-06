type CallbackType = (isContinued: boolean) => void;

const subscriptions: Array<[CallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: CallbackType): void {
  subscriptions.push([callback]);
}

export function fire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
