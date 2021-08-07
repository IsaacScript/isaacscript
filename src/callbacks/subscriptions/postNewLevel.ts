export type PostNewLevelCallbackType = () => void;

const subscriptions: Array<[PostNewLevelCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostNewLevelCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
