export type PostNewRoomCallbackType = () => void;

const subscriptions: Array<[PostNewRoomCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostNewRoomCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
