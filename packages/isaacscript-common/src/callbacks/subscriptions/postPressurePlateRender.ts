import { PressurePlateVariant } from "isaac-typescript-definitions";

export type PostPressurePlateRenderRegisterParameters = [
  callback: (pressurePlate: GridEntityPressurePlate) => void,
  pressurePlateVariant?: PressurePlateVariant,
];

const subscriptions: PostPressurePlateRenderRegisterParameters[] = [];

/** @internal */
export function postPressurePlateRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPressurePlateRenderRegister(
  ...args: PostPressurePlateRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
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
