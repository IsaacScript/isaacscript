import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomInitRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomInitRegisterParameters[] = [];

export function postGridEntityCustomInitHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityCustomInitRegister(
  ...args: PostGridEntityCustomInitRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityCustomInitFire(
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
