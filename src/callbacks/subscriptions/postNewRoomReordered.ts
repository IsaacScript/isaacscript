export type PostNewRoomReorderedCallbackType = () => void;

const subscriptions: Array<[PostNewRoomReorderedCallbackType]> = [];

export function postNewRoomReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNewRoomReorderedRegister(
  callback: PostNewRoomReorderedCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postNewRoomReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
