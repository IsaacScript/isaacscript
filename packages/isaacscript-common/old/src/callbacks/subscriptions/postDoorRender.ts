export type PostDoorRenderRegisterParameters = [
  callback: (door: GridEntityDoor) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostDoorRenderRegisterParameters[] = [];

/** @internal */
export function postDoorRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postDoorRenderRegister(
  ...args: PostDoorRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postDoorRenderFire(door: GridEntityDoor): void {
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
