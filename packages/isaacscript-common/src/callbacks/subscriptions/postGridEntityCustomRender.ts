import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomRenderRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomRenderRegisterParameters[] = [];

/** @internal */
export function postGridEntityCustomRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityCustomRenderRegister(
  ...args: PostGridEntityCustomRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
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
