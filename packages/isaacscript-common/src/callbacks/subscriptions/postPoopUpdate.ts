import { PoopGridEntityVariant } from "isaac-typescript-definitions";

export type PostPoopUpdateRegisterParameters = [
  callback: (poop: GridEntityPoop) => void,
  poopVariant?: PoopGridEntityVariant,
];

const subscriptions: PostPoopUpdateRegisterParameters[] = [];

/** @internal */
export function postPoopUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPoopUpdateRegister(
  ...args: PostPoopUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPoopUpdateFire(poop: GridEntityPoop): void {
  const poopVariant = poop.GetVariant();

  for (const [callback, callbackPoopVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackPoopVariant !== undefined &&
      callbackPoopVariant !== poopVariant
    ) {
      continue;
    }

    callback(poop);
  }
}
