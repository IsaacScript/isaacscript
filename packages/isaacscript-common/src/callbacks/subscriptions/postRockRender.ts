export type PostRockRenderRegisterParameters = [
  callback: (rock: GridEntityRock) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostRockRenderRegisterParameters[] = [];

export function postRockRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postRockRenderRegister(
  ...args: PostRockRenderRegisterParameters
): void {
  subscriptions.push(args);
}

export function postRockRenderFire(rock: GridEntityRock): void {
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
