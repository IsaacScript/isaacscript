import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityRenderRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
  variant?: int,
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

    callback(gridEntity);
  }
}
