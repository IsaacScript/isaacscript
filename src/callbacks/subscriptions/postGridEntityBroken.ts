import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityBrokenRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
];

const subscriptions: PostGridEntityBrokenRegisterParameters[] = [];

/** @internal */
export function postGridEntityBrokenHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityBrokenRegister(
  ...args: PostGridEntityBrokenRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityBrokenFire(gridEntity: GridEntity): void {
  for (const [callback, gridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      gridEntityType !== undefined &&
      gridEntityType !== gridEntity.GetType()
    ) {
      continue;
    }

    callback(gridEntity);
  }
}
