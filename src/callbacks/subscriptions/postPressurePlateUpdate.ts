export type PostPressurePlateUpdateRegisterParameters = [
  callback: (pressurePlate: GridEntityPressurePlate) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostPressurePlateUpdateRegisterParameters[] = [];

/** @internal */
export function postPressurePlateUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPressurePlateUpdateRegister(
  ...args: PostPressurePlateUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPressurePlateUpdateFire(
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
