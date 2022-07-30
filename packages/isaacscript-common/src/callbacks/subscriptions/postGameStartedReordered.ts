export type PostGameStartedReorderedRegisterParameters = [
  callback: (isContinued: boolean) => void,
];

const subscriptions: PostGameStartedReorderedRegisterParameters[] = [];

export function postGameStartedReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGameStartedReorderedRegister(
  ...args: PostGameStartedReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGameStartedReorderedFire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
