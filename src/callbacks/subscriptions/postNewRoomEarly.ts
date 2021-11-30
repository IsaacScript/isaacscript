export type PostNewRoomEarlyCallbackType = () => void;

const subscriptions: Array<[PostNewRoomEarlyCallbackType]> = [];

export function postNewRoomEarlyHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNewRoomEarlyRegister(
  callback: PostNewRoomEarlyCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postNewRoomEarlyFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
