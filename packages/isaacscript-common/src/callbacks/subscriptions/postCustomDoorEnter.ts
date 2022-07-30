import { Direction, DoorSlot } from "isaac-typescript-definitions";

export type PostCustomDoorEnterRegisterParameters = [
  callback: (
    player: EntityPlayer,
    effectVariant: int,
    doorSlot: DoorSlot,
    direction: Direction,
  ) => void,
  effectVariant?: int,
];

const subscriptions: PostCustomDoorEnterRegisterParameters[] = [];

export function postCustomDoorEnterHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postCustomDoorEnterRegister(
  ...args: PostCustomDoorEnterRegisterParameters
): void {
  subscriptions.push(args);
}

export function postCustomDoorEnterFire(
  player: EntityPlayer,
  effectVariant: int,
  doorSlot: DoorSlot,
  direction: Direction,
): void {
  for (const [callback, callbackEffectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackEffectVariant !== undefined &&
      callbackEffectVariant !== effectVariant
    ) {
      continue;
    }

    callback(player, effectVariant, doorSlot, direction);
  }
}
