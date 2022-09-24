export type PostRockUpdateRegisterParameters = [
  callback: (rock: GridEntityRock) => void,
  // This is not `RockVariant` because `GridEntityRock` can be other grid entity types than just
  // `GridEntityType.ROCK`.
  variant?: int,
];

const subscriptions: PostRockUpdateRegisterParameters[] = [];

export function postRockUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postRockUpdateRegister(
  ...args: PostRockUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postRockUpdateFire(rock: GridEntityRock): void {
  const variant = rock.GetVariant();

  for (const [callback, callbackVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(rock);
  }
}
