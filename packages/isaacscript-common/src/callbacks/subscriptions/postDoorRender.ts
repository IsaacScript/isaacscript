import { DoorVariant } from "isaac-typescript-definitions";

export type PostDoorRenderRegisterParameters = [
  callback: (door: GridEntityDoor) => void,
  doorVariant?: DoorVariant,
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
  const doorVariant = door.GetVariant();

  for (const [callback, callbackDoorVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackDoorVariant !== undefined &&
      callbackDoorVariant !== doorVariant
    ) {
      continue;
    }

    callback(door);
  }
}
