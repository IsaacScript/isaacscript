export type PostPoopRenderRegisterParameters = [
  callback: (poop: GridEntityPoop) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostPoopRenderRegisterParameters[] = [];

/** @internal */
export function postPoopRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPoopRenderRegister(
  ...args: PostPoopRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPoopRenderFire(poop: GridEntityPoop): void {
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
