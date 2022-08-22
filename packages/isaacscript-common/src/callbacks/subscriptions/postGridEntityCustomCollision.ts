import { EntityType, GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomCollisionRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
    entity: Entity,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
  entityType?: EntityType,
  entityVariant?: int,
];

const subscriptions: PostGridEntityCustomCollisionRegisterParameters[] = [];

export function postGridEntityCustomCollisionHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityCustomCollisionRegister(
  ...args: PostGridEntityCustomCollisionRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityCustomCollisionFire(
  gridEntity: GridEntity,
  gridEntityTypeCustom: GridEntityType,
  entity: Entity,
): void {
  for (const [
    callback,
    callbackGridEntityTypeCustom,
    callbackEntityType,
    callbackEntityVariant,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityTypeCustom !== undefined &&
      callbackGridEntityTypeCustom !== gridEntityTypeCustom
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (
      callbackEntityType !== undefined &&
      callbackEntityType !== entity.Type
    ) {
      continue;
    }

    // Handle the optional 4th callback argument.
    if (
      callbackEntityVariant !== undefined &&
      callbackEntityVariant !== entity.Variant
    ) {
      continue;
    }

    callback(gridEntity, gridEntityTypeCustom, entity);
  }
}
