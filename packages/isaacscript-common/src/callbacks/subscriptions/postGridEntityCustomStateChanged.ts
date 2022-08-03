import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomStateChangedRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
    oldState: int,
    newState: int,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomStateChangedRegisterParameters[] = [];

export function postGridEntityCustomStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityCustomStateChangedRegister(
  ...args: PostGridEntityCustomStateChangedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityCustomStateChangedFire(
  gridEntity: GridEntity,
  gridEntityTypeCustom: GridEntityType,
  oldState: int,
  newState: int,
): void {
  for (const [callback, callbackGridEntityTypeCustom] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityTypeCustom !== undefined &&
      callbackGridEntityTypeCustom !== gridEntityTypeCustom
    ) {
      continue;
    }

    callback(gridEntity, gridEntityTypeCustom, oldState, newState);
  }
}
