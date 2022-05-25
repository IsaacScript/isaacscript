export type PostDoorUpdateRegisterParameters = [
  callback: (door: GridEntityDoor) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostDoorUpdateRegisterParameters[] = [];

/** @internal */
export function postDoorUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postDoorUpdateRegister(
  ...args: PostDoorUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postDoorUpdateFire(door: GridEntityDoor): void {
  const gridEntityVariant = door.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(door);
  }
}
