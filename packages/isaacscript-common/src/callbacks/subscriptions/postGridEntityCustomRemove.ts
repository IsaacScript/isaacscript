import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomRemoveRegisterParameters = [
  callback: (gridIndex: int, gridEntityTypeCustom: GridEntityType) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomRemoveRegisterParameters[] = [];

export function postGridEntityCustomRemoveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityCustomRemoveRegister(
  ...args: PostGridEntityCustomRemoveRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityCustomRemoveFire(
  gridIndex: int,
  gridEntityTypeCustom: GridEntityType,
): void {
  for (const [callback, callbackGridEntityTypeCustom] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityTypeCustom !== undefined &&
      callbackGridEntityTypeCustom !== gridEntityTypeCustom
    ) {
      continue;
    }

    callback(gridIndex, gridEntityTypeCustom);
  }
}
