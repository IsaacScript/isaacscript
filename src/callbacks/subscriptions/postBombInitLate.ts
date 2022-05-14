import { BombVariant } from "isaac-typescript-definitions";

export type PostBombInitRegisterParameters = [
  callback: (bomb: EntityBomb) => void,
  bombVariant?: BombVariant | int,
];

const subscriptions: PostBombInitRegisterParameters[] = [];

/** @internal */
export function postBombInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postBombInitLateRegister(
  ...args: PostBombInitRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postBombInitLateFire(bomb: EntityBomb): void {
  for (const [callback, bombVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (bombVariant !== undefined && bombVariant !== bomb.Variant) {
      continue;
    }

    callback(bomb);
  }
}
