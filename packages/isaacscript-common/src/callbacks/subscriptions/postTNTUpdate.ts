export type PostTNTUpdateRegisterParameters = [
  callback: (tnt: GridEntityTNT) => void,
  variant?: int,
];

const subscriptions: PostTNTUpdateRegisterParameters[] = [];

export function postTNTUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postTNTUpdateRegister(
  ...args: PostTNTUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postTNTUpdateFire(tnt: GridEntityTNT): void {
  const variant = tnt.GetVariant();

  for (const [callback, callbackVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(tnt);
  }
}
