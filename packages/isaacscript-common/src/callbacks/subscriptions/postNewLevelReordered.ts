export type PostNewLevelReorderedRegisterParameters = [callback: () => void];

const subscriptions: PostNewLevelReorderedRegisterParameters[] = [];

export function postNewLevelReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postNewLevelReorderedRegister(
  ...args: PostNewLevelReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postNewLevelReorderedFire(): void {
  for (const [callback] of subscriptions) {
    callback();
  }
}
