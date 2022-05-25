export type PostRoomClearChangedRegisterParameters = [
  callback: (roomClear: boolean) => void,
];

const subscriptions: PostRoomClearChangedRegisterParameters[] = [];

/** @internal */
export function postRoomClearChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postRoomClearChangedRegister(
  ...args: PostRoomClearChangedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postRoomClearChangedFire(roomClear: boolean): void {
  for (const [callback] of subscriptions) {
    callback(roomClear);
  }
}
