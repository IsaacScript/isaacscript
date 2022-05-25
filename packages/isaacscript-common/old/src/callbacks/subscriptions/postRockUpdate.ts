export type PostRockUpdateRegisterParameters = [
  callback: (rock: GridEntityRock) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostRockUpdateRegisterParameters[] = [];

/** @internal */
export function postRockUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postRockUpdateRegister(
  ...args: PostRockUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postRockUpdateFire(rock: GridEntityRock): void {
  const gridEntityVariant = rock.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(rock);
  }
}
