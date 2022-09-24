import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityStateChangedRegisterParameters = [
  callback: (gridEntity: GridEntity, oldState: int, newState: int) => void,
  gridEntityType?: GridEntityType,
  variant?: int,
];

const subscriptions: PostGridEntityStateChangedRegisterParameters[] = [];

export function postGridEntityStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityStateChangedRegister(
  ...args: PostGridEntityStateChangedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityStateChangedFire(
  gridEntity: GridEntity,
  oldState: int,
  newState: int,
): void {
  const gridEntityType = gridEntity.GetType();
  const variant = gridEntity.GetVariant();

  for (const [
    callback,
    callbackGridEntityType,
    callbackVariant,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityType !== undefined &&
      callbackGridEntityType !== gridEntityType
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(gridEntity, oldState, newState);
  }
}
