export type PostGameStartedReorderedRegisterParameters = [
  callback: (isContinued: boolean) => void,
];

const subscriptions: PostGameStartedReorderedRegisterParameters[] = [];

/** @internal */
export function postGameStartedReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGameStartedReorderedRegister(
  ...args: PostGameStartedReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGameStartedReorderedFire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
