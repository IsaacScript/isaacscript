import { PressurePlateVariant } from "isaac-typescript-definitions";

export type PostPressurePlateUpdateRegisterParameters = [
  callback: (pressurePlate: GridEntityPressurePlate) => void,
  pressurePlateVariant?: PressurePlateVariant,
];

const subscriptions: PostPressurePlateUpdateRegisterParameters[] = [];

/** @internal */
export function postPressurePlateUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPressurePlateUpdateRegister(
  ...args: PostPressurePlateUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPressurePlateUpdateFire(
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
