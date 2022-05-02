type CallbackType = (isContinued: boolean) => void;

export type PostGameStartedReorderedRegisterParameters = [
  callback: CallbackType,
];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postGameStartedReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGameStartedReorderedRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postGameStartedReorderedFire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
