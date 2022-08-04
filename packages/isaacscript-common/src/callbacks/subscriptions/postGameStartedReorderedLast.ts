export type PostGameStartedReorderedLastRegisterParameters = [
  callback: (isContinued: boolean) => void,
];

const subscriptions: PostGameStartedReorderedLastRegisterParameters[] = [];

export function postGameStartedReorderedLastHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGameStartedReorderedLastRegister(
  ...args: PostGameStartedReorderedLastRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGameStartedReorderedLastFire(isContinued: boolean): void {
  for (const [callback] of subscriptions) {
    callback(isContinued);
  }
}
