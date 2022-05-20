import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityStateChangedRegisterParameters = [
  callback: (gridEntity: GridEntity, oldState: int, newState: int) => void,
  gridEntityType?: GridEntityType,
  gridEntityVariant?: int,
];

const subscriptions: PostGridEntityStateChangedRegisterParameters[] = [];

/** @internal */
export function postGridEntityStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityStateChangedRegister(
  ...args: PostGridEntityStateChangedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityStateChangedFire(
  gridEntity: GridEntity,
  oldState: int,
  newState: int,
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

    callback(gridEntity, oldState, newState);
  }
}
