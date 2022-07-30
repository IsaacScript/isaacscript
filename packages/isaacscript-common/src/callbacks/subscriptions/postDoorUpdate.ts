import { DoorVariant } from "isaac-typescript-definitions";

export type PostDoorUpdateRegisterParameters = [
  callback: (door: GridEntityDoor) => void,
  doorVariant?: DoorVariant,
];

const subscriptions: PostDoorUpdateRegisterParameters[] = [];

export function postDoorUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postDoorUpdateRegister(
  ...args: PostDoorUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postDoorUpdateFire(door: GridEntityDoor): void {
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
