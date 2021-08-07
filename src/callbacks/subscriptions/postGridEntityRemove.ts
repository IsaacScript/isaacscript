export type PostGridEntityRemoveCallbackType = (
  gridIndex: int,
  gridEntityType: GridEntityType,
) => void;

const subscriptions: Array<
  [PostGridEntityRemoveCallbackType, GridEntityType | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostGridEntityRemoveCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

export function fire(gridIndex: int, gridEntityType: GridEntityType): void {
  for (const [callback, callbackGridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      return;
    }

    callback(gridIndex, gridEntityType);
  }
}
