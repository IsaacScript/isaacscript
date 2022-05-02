export type PostGridEntityStateChangedRegisterParameters = [
  callback: (gridEntity: GridEntity, oldState: int, newState: int) => void,
  gridEntityType?: GridEntityType,
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
  for (const [callback, gridEntityType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      gridEntityType !== undefined &&
      gridEntityType !== gridEntity.GetType()
    ) {
      continue;
    }

    callback(gridEntity, oldState, newState);
  }
}
