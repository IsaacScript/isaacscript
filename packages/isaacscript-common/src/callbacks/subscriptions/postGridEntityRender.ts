import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityRenderRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
  gridEntityVariant?: int,
];

const subscriptions: PostGridEntityRenderRegisterParameters[] = [];

export function postGridEntityRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityRenderRegister(
  ...args: PostGridEntityRenderRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityRenderFire(gridEntity: GridEntity): void {
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
