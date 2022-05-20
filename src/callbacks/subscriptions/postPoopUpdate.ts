export type PostPoopUpdateRegisterParameters = [
  callback: (poop: GridEntityPoop) => void,
  gridEntityVariant?: int,
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
  const gridEntityVariant = poop.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(poop);
  }
}
