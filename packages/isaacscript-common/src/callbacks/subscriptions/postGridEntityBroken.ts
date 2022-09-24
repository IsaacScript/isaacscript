import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityBrokenRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
  variant?: int,
];

const subscriptions: PostGridEntityBrokenRegisterParameters[] = [];

export function postGridEntityBrokenHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postGridEntityBrokenRegister(
  ...args: PostGridEntityBrokenRegisterParameters
): void {
  subscriptions.push(args);
}

export function postGridEntityBrokenFire(gridEntity: GridEntity): void {
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
