import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomUpdateRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomUpdateRegisterParameters[] = [];

/** @internal */
export function postGridEntityCustomUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityCustomUpdateRegister(
  ...args: PostGridEntityCustomUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityCustomUpdateFire(
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
