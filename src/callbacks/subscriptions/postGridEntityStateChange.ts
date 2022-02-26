export type PostGridEntityStateChangeCallbackType = (
  gridEntity: GridEntity,
  oldState: int,
  newState: int,
) => void;

const subscriptions: Array<
  [PostGridEntityStateChangeCallbackType, GridEntityType | undefined]
> = [];

/** @internal */
export function postGridEntityStateChangeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityStateChangeRegister(
  callback: PostGridEntityStateChangeCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

/** @internal */
export function postGridEntityStateChangeFire(
  gridEntity: GridEntity,
  oldState: int,
  newState: int,
): void {
  for (const [callback, gridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      gridEntityType !== undefined &&
      gridEntityType !== gridEntity.GetType()
    ) {
      continue;
    }

    callback(gridEntity, oldState, newState);
  }
}
