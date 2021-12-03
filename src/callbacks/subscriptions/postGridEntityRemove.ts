/** @internal */
export type PostGridEntityRemoveCallbackType = (
  gridIndex: int,
  gridEntityType: GridEntityType,
) => void;

const subscriptions: Array<
  [PostGridEntityRemoveCallbackType, GridEntityType | undefined]
> = [];

/** @internal */
export function postGridEntityRemoveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityRemoveRegister(
  callback: PostGridEntityRemoveCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
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
