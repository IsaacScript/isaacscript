export type PostGridEntityUpdateCallbackType = (gridEntity: GridEntity) => void;

const subscriptions: Array<
  [PostGridEntityUpdateCallbackType, GridEntityType | undefined]
> = [];

/** @internal */
export function postGridEntityUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityUpdateRegister(
  callback: PostGridEntityUpdateCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

/** @internal */
export function postGridEntityUpdateFire(gridEntity: GridEntity): void {
  for (const [callback, gridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      gridEntityType !== undefined &&
      gridEntityType !== gridEntity.GetType()
    ) {
      continue;
    }

    callback(gridEntity);
  }
}
