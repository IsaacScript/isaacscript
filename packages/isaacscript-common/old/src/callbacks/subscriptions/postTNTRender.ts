export type PostTNTRenderRegisterParameters = [
  callback: (tnt: GridEntityTNT) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostTNTRenderRegisterParameters[] = [];

/** @internal */
export function postTNTRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTNTRenderRegister(
  ...args: PostTNTRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
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
