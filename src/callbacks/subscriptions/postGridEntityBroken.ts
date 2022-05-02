type CallbackType = (gridEntity: GridEntity) => void;

export type PostGridEntityBrokenRegisterParameters = [
  callback: CallbackType,
  gridEntityType?: GridEntityType,
];

const subscriptions: Array<[CallbackType, GridEntityType | undefined]> = [];

/** @internal */
export function postGridEntityBrokenHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGridEntityBrokenRegister(
  callback: CallbackType,
  gridEntityType?: GridEntityType,
): void {
  subscriptions.push([callback, gridEntityType]);
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
