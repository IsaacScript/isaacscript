export type RoomClearChangeCallbackType = (roomClear: boolean) => void;

const subscriptions: Array<[RoomClearChangeCallbackType]> = [];

/** @internal */
export function roomClearChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function roomClearChangedRegister(
  callback: RoomClearChangeCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function roomClearChangedFire(roomClear: boolean): void {
  for (const [callback] of subscriptions) {
    callback(roomClear);
  }
}
