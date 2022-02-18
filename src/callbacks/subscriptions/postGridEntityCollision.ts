export type PostGridEntityCollisionCallbackType = (
  gridEntity: GridEntity,
  entity: Entity,
) => void;

const subscriptions: Array<
  [PostGridEntityCollisionCallbackType, GridEntityType | undefined]
> = [];

/** @internal */
export function postGridEntityCollisionHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityCollisionRegister(
  callback: PostGridEntityCollisionCallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
}

/** @internal */
export function postGridEntityCollisionFire(
  gridEntity: GridEntity,
  entity: Entity,
): void {
  const gridEntityType = gridEntity.GetType();

  for (const [callback, callbackGridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    callback(gridEntity, entity);
  }
}
