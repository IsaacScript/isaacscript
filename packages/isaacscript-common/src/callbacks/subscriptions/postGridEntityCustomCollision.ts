import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityCustomCollisionRegisterParameters = [
  callback: (
    gridEntity: GridEntity,
    gridEntityTypeCustom: GridEntityType,
    entity: Entity,
  ) => void,
  gridEntityTypeCustom?: GridEntityType,
];

const subscriptions: PostGridEntityCustomCollisionRegisterParameters[] = [];

/** @internal */
export function postGridEntityCustomCollisionHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityCustomCollisionRegister(
  ...args: PostGridEntityCustomCollisionRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityCustomCollisionFire(
  gridEntity: GridEntity,
  gridEntityTypeCustom: GridEntityType,
  entity: Entity,
): void {
  for (const [callback, callbackGridEntityTypeCustom] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityTypeCustom !== undefined &&
      callbackGridEntityTypeCustom !== gridEntityTypeCustom
    ) {
      continue;
    }

    callback(gridEntity, gridEntityTypeCustom, entity);
  }
}
