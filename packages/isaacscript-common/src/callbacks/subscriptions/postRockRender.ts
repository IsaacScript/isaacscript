export type PostRockRenderRegisterParameters = [
  callback: (rock: GridEntityRock) => void,
  // This is not `RockVariant` because `GridEntityRock` can be other grid entity types than just
  // `GridEntityType.ROCK`.
  variant?: int,
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
  const variant = rock.GetVariant();

  for (const [callback, callbackVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(rock);
  }
}
