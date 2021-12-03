export type PostNewRoomReorderedCallbackType = () => void;

const subscriptions: Array<[PostNewRoomReorderedCallbackType]> = [];

/** @internal */
export function postNewRoomReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postNewRoomReorderedRegister(
  callback: PostNewRoomReorderedCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postNewRoomReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
