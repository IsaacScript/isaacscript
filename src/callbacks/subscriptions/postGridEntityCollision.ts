import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCollisionRegisterParameters = [
  callback: (gridEntity: GridEntity, entity: Entity) => void,
  gridEntityType?: GridEntityType,
];

const subscriptions: PostGridEntityCollisionRegisterParameters[] = [];

/** @internal */
export function postGridEntityCollisionHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityCollisionRegister(
  ...args: PostGridEntityCollisionRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityCollisionFire(
  gridEntity: GridEntity,
  entity: Entity,
): void {
  const gridEntityType = gridEntity.GetType();

  for (const [callback, callbackGridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    callback(gridEntity, entity);
  }
}
