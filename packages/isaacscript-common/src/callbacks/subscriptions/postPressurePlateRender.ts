import { PressurePlateVariant } from "isaac-typescript-definitions";

export type PostPressurePlateRenderRegisterParameters = [
  callback: (pressurePlate: GridEntityPressurePlate) => void,
  pressurePlateVariant?: PressurePlateVariant,
];

const subscriptions: PostPressurePlateRenderRegisterParameters[] = [];

export function postPressurePlateRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPressurePlateRenderRegister(
  ...args: PostPressurePlateRenderRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPressurePlateRenderFire(
  pressurePlate: GridEntityPressurePlate,
): void {
  const pressurePlateVariant = pressurePlate.GetVariant();

  for (const [callback, callbackPressurePlateVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackPressurePlateVariant !== undefined &&
      callbackPressurePlateVariant !== pressurePlateVariant
    ) {
      continue;
    }

    callback(pressurePlate);
  }
}
