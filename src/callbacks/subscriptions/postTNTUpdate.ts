export type PostTNTUpdateRegisterParameters = [
  callback: (tnt: GridEntityTNT) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostTNTUpdateRegisterParameters[] = [];

/** @internal */
export function postTNTUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTNTUpdateRegister(
  ...args: PostTNTUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postTNTUpdateFire(tnt: GridEntityTNT): void {
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
