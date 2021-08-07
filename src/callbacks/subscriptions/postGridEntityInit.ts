export type PostGridEntityInitCallbackType = (gridEntity: GridEntity) => void;

const subscriptions: Array<
  [PostGridEntityInitCallbackType, GridEntityType | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostGridEntityInitCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

export function fire(gridEntity: GridEntity): void {
  for (const [callback, gridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      gridEntityType !== undefined &&
      gridEntityType !== gridEntity.GetType()
    ) {
      return;
    }

    callback(gridEntity);
  }
}
