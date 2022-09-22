import { BombVariant } from "isaac-typescript-definitions";

export type PostBombExplodedRegisterParameters = [
  callback: (bomb: EntityBomb) => void,
  bombVariant?: BombVariant,
];

const subscriptions: PostBombExplodedRegisterParameters[] = [];

export function postBombExplodedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postBombExplodedRegister(
  ...args: PostBombExplodedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postBombExplodedFire(bomb: EntityBomb): void {
  for (const [callback, bombVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (bombVariant !== undefined && bombVariant !== bomb.Variant) {
      continue;
    }

    callback(bomb);
  }
}
