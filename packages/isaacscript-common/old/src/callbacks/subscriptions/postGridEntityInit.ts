import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityInitRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
  gridEntityVariant?: int,
];

const subscriptions: PostGridEntityInitRegisterParameters[] = [];

/** @internal */
export function postGridEntityInitHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityInitRegister(
  ...args: PostGridEntityInitRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityInitFire(gridEntity: GridEntity): void {
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

    callback(gridEntity);
  }
}
