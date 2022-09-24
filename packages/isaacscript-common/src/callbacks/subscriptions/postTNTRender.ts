export type PostTNTRenderRegisterParameters = [
  callback: (tnt: GridEntityTNT) => void,
  variant?: int,
];

const subscriptions: PostTNTRenderRegisterParameters[] = [];

export function postTNTRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postTNTRenderRegister(
  ...args: PostTNTRenderRegisterParameters
): void {
  subscriptions.push(args);
}

export function postTNTRenderFire(tnt: GridEntityTNT): void {
  const variant = tnt.GetVariant();

  for (const [callback, callbackVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(tnt);
  }
}
