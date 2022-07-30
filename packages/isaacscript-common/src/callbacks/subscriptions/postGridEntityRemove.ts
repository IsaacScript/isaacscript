import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityRemoveRegisterParameters = [
  callback: (gridIndex: int, gridEntityType: GridEntityType) => void,
  gridEntityType?: GridEntityType,
  gridEntityVariant?: int,
];

const subscriptions: PostGridEntityRemoveRegisterParameters[] = [];

export function postGridEntityRemoveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityRemoveRegister(
  ...args: PostGridEntityRemoveRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityRemoveFire(
  gridIndex: int,
  gridEntityType: GridEntityType,
  gridEntityVariant: int,
): void {
  for (const [
    callback,
    callbackGridEntityType,
    callbackGridEntityVariant,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(gridIndex, gridEntityType);
  }
}
