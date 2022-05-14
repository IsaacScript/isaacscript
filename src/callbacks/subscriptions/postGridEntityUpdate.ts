import { GridEntityType } from "isaac-typescript-definitions";

export type PostGridEntityUpdateRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
];

const subscriptions: PostGridEntityUpdateRegisterParameters[] = [];

/** @internal */
export function postGridEntityUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityUpdateRegister(
  ...args: PostGridEntityUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGridEntityUpdateFire(gridEntity: GridEntity): void {
  for (const [callback, gridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      gridEntityType !== undefined &&
      gridEntityType !== gridEntity.GetType()
    ) {
      continue;
    }

    callback(gridEntity);
  }
}
