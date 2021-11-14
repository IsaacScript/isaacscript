export type PostBombInitLateCallbackType = (bomb: EntityBomb) => void;

const subscriptions: Array<
  [PostBombInitLateCallbackType, BombVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostBombInitLateCallbackType,
  bombVariant?: BombVariant,
): void {
  subscriptions.push([callback, bombVariant]);
}

export function fire(bomb: EntityBomb): void {
  for (const [callback, bombVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (bombVariant !== undefined && bombVariant !== bomb.Variant) {
      continue;
    }

    callback(bomb);
  }
}
