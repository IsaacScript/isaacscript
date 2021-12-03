export type PostNewRoomEarlyCallbackType = () => void;

const subscriptions: Array<[PostNewRoomEarlyCallbackType]> = [];

/** @internal */
export function postNewRoomEarlyHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNewRoomEarlyRegister(
  callback: PostNewRoomEarlyCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postNewRoomEarlyFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
