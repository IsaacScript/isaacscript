import { BombVariant } from "isaac-typescript-definitions";

export type PostBombInitRegisterParameters = [
  callback: (bomb: EntityBomb) => void,
  bombVariant?: BombVariant,
];

const subscriptions: PostBombInitRegisterParameters[] = [];

export function postBombInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postBombInitLateRegister(
  ...args: PostBombInitRegisterParameters
): void {
  subscriptions.push(args);
}

export function postBombInitLateFire(bomb: EntityBomb): void {
  for (const [callback, bombVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (bombVariant !== undefined && bombVariant !== bomb.Variant) {
      continue;
    }

    callback(bomb);
  }
}
