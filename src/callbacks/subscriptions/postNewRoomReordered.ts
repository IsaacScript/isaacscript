export type PostNewRoomReorderedCallbackType = () => void;

const subscriptions: Array<[PostNewRoomReorderedCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostNewRoomReorderedCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
