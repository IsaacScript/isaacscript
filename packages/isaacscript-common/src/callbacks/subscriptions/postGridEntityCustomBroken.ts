import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomBrokenRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomBrokenRegisterParameters[] = [];

/** @internal */
export function postGridEntityCustomBrokenHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityCustomBrokenRegister(
  ...args: PostGridEntityCustomBrokenRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityCustomBrokenFire(
  gridEntity: GridEntity,
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

    callback(gridEntity, gridEntityTypeCustom);
  }
}
