import { BombVariant } from "isaac-typescript-definitions";

export type PostBombDetonatedRegisterParameters = [
  callback: (bomb: EntityBomb) => void,
  bombVariant?: BombVariant,
];

const subscriptions: PostBombDetonatedRegisterParameters[] = [];

/** @internal */
export function postBombDetonatedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postBombDetonatedRegister(
  ...args: PostBombDetonatedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postBombDetonatedFire(bomb: EntityBomb): void {
  for (const [callback, bombVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (bombVariant !== undefined && bombVariant !== bomb.Variant) {
      continue;
    }

    callback(bomb);
  }
}
