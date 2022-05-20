export type PostPitRenderRegisterParameters = [
  callback: (pit: GridEntityPit) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostPitRenderRegisterParameters[] = [];

/** @internal */
export function postPitRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPitRenderRegister(
  ...args: PostPitRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPitRenderFire(pit: GridEntityPit): void {
  const gridEntityVariant = pit.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(pit);
  }
}
