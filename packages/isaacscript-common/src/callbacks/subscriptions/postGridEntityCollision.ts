import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCollisionRegisterParameters = [
  callback: (gridEntity: GridEntity, entity: Entity) => void,
  gridEntityType?: GridEntityType,
  gridEntityVariant?: int,
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
  const gridEntityVariant = gridEntity.GetVariant();

  for (const [
    callback,
    callbackGridEntityType,
    callbackGridEntityVariant,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(gridEntity, entity);
  }
}
