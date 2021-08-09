export type PostNewLevelReorderedCallbackType = () => void;

const subscriptions: Array<[PostNewLevelReorderedCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostNewLevelReorderedCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
