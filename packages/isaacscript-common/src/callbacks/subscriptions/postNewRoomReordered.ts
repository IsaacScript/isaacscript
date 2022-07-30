export type PostNewRoomReorderedRegisterParameters = [callback: () => void];

const subscriptions: PostNewRoomReorderedRegisterParameters[] = [];

export function postNewRoomReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNewRoomReorderedRegister(
  ...args: PostNewRoomReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postNewRoomReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
