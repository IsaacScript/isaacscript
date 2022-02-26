export type PostGridEntityBrokenCallbackType = (gridEntity: GridEntity) => void;

const subscriptions: Array<
  [PostGridEntityBrokenCallbackType, GridEntityType | undefined]
> = [];

/** @internal */
export function postGridEntityBrokenHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityBrokenRegister(
  callback: PostGridEntityBrokenCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

/** @internal */
export function postGridEntityBrokenFire(gridEntity: GridEntity): void {
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
