export type PostCustomDoorEnterCallbackType = (door: GridEntityDoor) => void;

const subscriptions: Array<
  [PostCustomDoorEnterCallbackType, DoorVariant | int]
> = [];

/** @internal */
export function postCustomDoorEnterHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCustomDoorEnterRegister(
  callback: PostCustomDoorEnterCallbackType,
  doorVariant: DoorVariant | int,
): void {
  subscriptions.push([callback, doorVariant]);
}

/** @internal */
export function postCustomDoorEnterFire(door: GridEntityDoor): void {
  for (const [callback, doorVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (doorVariant !== undefined && doorVariant !== door.GetVariant()) {
      continue;
    }

    callback(door);
  }
}
