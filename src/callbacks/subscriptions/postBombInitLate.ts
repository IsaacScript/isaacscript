export type PostBombInitLateCallbackType = (bomb: EntityBomb) => void;

const subscriptions: Array<
  [PostBombInitLateCallbackType, BombVariant | int | undefined]
> = [];

export function postBombInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postBombInitLateRegister(
  callback: PostBombInitLateCallbackType,
  bombVariant?: BombVariant | int,
): void {
  subscriptions.push([callback, bombVariant]);
}

export function postBombInitLateFire(bomb: EntityBomb): void {
  for (const [callback, bombVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (bombVariant !== undefined && bombVariant !== bomb.Variant) {
      continue;
    }

    callback(bomb);
  }
}
