export type PostGridEntityInitRegisterParameters = [
  callback: (gridEntity: GridEntity) => void,
  gridEntityType?: GridEntityType,
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
