import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityRemoveRegisterParameters = [
  callback: (
    gridIndex: int,
    gridEntityType: GridEntityType,
    variant: int,
  ) => void,
  gridEntityType?: GridEntityType,
  variant?: int,
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
  variant: int,
): void {
  for (const [
    callback,
    callbackGridEntityType,
    callbackVariant,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(gridIndex, gridEntityType, variant);
  }
}
