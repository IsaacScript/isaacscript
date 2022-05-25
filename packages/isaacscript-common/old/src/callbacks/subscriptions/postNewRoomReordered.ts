export type PostNewRoomReorderedRegisterParameters = [callback: () => void];

const subscriptions: PostNewRoomReorderedRegisterParameters[] = [];

/** @internal */
export function postNewRoomReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNewRoomReorderedRegister(
  ...args: PostNewRoomReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postNewRoomReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
