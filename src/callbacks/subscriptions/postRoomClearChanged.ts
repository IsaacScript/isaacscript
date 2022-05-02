export type PostRoomClearChangedCallbackType = (roomClear: boolean) => void;

const subscriptions: Array<[PostRoomClearChangedCallbackType]> = [];

/** @internal */
export function postRoomClearChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postRoomClearChangedRegister(
  callback: PostRoomClearChangedCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postRoomClearChangedFire(roomClear: boolean): void {
  for (const [callback] of subscriptions) {
    callback(roomClear);
  }
}
