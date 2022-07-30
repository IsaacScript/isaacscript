import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomRenderRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomRenderRegisterParameters[] = [];

export function postGridEntityCustomRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityCustomRenderRegister(
  ...args: PostGridEntityCustomRenderRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityCustomRenderFire(
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
