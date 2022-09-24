import { EntityType, GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCollisionRegisterParameters = [
  callback: (gridEntity: GridEntity, entity: Entity) => void,
  gridEntityType?: GridEntityType,
  gridEntityVariant?: int,
  entityType?: EntityType,
  entityVariant?: int,
];

const subscriptions: PostGridEntityCollisionRegisterParameters[] = [];

export function postGridEntityCollisionHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityCollisionRegister(
  ...args: PostGridEntityCollisionRegisterParameters
): void {
  subscriptions.push(args);
}

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
    callbackEntityType,
    callbackEntityVariant,
  ] of subscriptions) {
    // Handle the optional 3rd callback argument.
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    // Handle the optional 4th callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    // Handle the optional 5th callback argument.
    if (
      callbackEntityType !== undefined &&
      callbackEntityType !== entity.Type
    ) {
      continue;
    }

    // Handle the optional 6th callback argument.
    if (
      callbackEntityVariant !== undefined &&
      callbackEntityVariant !== entity.Variant
    ) {
      continue;
    }

    callback(gridEntity, entity);
  }
}
