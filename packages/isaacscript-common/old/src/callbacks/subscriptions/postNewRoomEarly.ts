export type PostNewRoomEarlyRegisterParameters = [callback: () => void];

const subscriptions: PostNewRoomEarlyRegisterParameters[] = [];

/** @internal */
export function postNewRoomEarlyHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNewRoomEarlyRegister(
  ...args: PostNewRoomEarlyRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postNewRoomEarlyFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
