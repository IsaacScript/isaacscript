export type PostGridEntityInitCallbackType = (gridEntity: GridEntity) => void;

const subscriptions: Array<
  [PostGridEntityInitCallbackType, GridEntityType | undefined]
> = [];

export function postGridEntityInitHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityInitRegister(
  callback: PostGridEntityInitCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

export function postGridEntityInitFire(gridEntity: GridEntity): void {
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
