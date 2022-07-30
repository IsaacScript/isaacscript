export type PostNewRoomEarlyRegisterParameters = [callback: () => void];

const subscriptions: PostNewRoomEarlyRegisterParameters[] = [];

export function postNewRoomEarlyHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNewRoomEarlyRegister(
  ...args: PostNewRoomEarlyRegisterParameters
): void {
  subscriptions.push(args);
}

export function postNewRoomEarlyFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
