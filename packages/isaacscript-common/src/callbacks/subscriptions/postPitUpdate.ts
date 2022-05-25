export type PostPitUpdateRegisterParameters = [
  callback: (pit: GridEntityPit) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostPitUpdateRegisterParameters[] = [];

/** @internal */
export function postPitUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPitUpdateRegister(
  ...args: PostPitUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPitUpdateFire(pit: GridEntityPit): void {
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
