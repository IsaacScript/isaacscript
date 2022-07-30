export type PostTNTRenderRegisterParameters = [
  callback: (tnt: GridEntityTNT) => void,
  gridEntityVariant?: int,
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
  const gridEntityVariant = tnt.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(tnt);
  }
}
