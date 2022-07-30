export type PostRoomClearChangedRegisterParameters = [
  callback: (roomClear: boolean) => void,
  roomClear?: boolean,
];

const subscriptions: PostRoomClearChangedRegisterParameters[] = [];

export function postRoomClearChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postRoomClearChangedRegister(
  ...args: PostRoomClearChangedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postRoomClearChangedFire(roomClear: boolean): void {
  for (const [callback, callbackRoomClear] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackRoomClear !== undefined && callbackRoomClear !== roomClear) {
      continue;
    }

    callback(roomClear);
  }
}
