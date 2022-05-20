export type PostPressurePlateRenderRegisterParameters = [
  callback: (pressurePlate: GridEntityPressurePlate) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostPressurePlateRenderRegisterParameters[] = [];

/** @internal */
export function postPressurePlateRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPressurePlateRenderRegister(
  ...args: PostPressurePlateRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPressurePlateRenderFire(
  pressurePlate: GridEntityPressurePlate,
): void {
  const gridEntityVariant = pressurePlate.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(pressurePlate);
  }
}
