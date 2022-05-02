export type PostGridEntityStateChangedCallbackType = (
  gridEntity: GridEntity,
  oldState: int,
  newState: int,
) => void;

const subscriptions: Array<
  [PostGridEntityStateChangedCallbackType, GridEntityType | undefined]
> = [];

/** @internal */
export function postGridEntityStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityStateChangedRegister(
  callback: PostGridEntityStateChangedCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

/** @internal */
export function postGridEntityStateChangedFire(
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
