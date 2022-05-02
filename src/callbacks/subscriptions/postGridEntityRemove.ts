export type PostGridEntityRemoveRegisterParameters = [
  callback: (gridIndex: int, gridEntityType: GridEntityType) => void,
  gridEntityType?: GridEntityType,
];

const subscriptions: PostGridEntityRemoveRegisterParameters[] = [];

/** @internal */
export function postGridEntityRemoveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityRemoveRegister(
  ...args: PostGridEntityRemoveRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityRemoveFire(
  gridIndex: int,
  gridEntityType: GridEntityType,
): void {
  for (const [callback, callbackGridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    callback(gridIndex, gridEntityType);
  }
}
