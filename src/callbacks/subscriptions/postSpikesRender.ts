export type PostSpikesRenderRegisterParameters = [
  callback: (spikes: GridEntitySpikes) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostSpikesRenderRegisterParameters[] = [];

/** @internal */
export function postSpikesRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSpikesRenderRegister(
  ...args: PostSpikesRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postSpikesRenderFire(spikes: GridEntitySpikes): void {
  const gridEntityVariant = spikes.GetVariant();

  for (const [callback, callbackGridEntityVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackGridEntityVariant !== undefined &&
      callbackGridEntityVariant !== gridEntityVariant
    ) {
      continue;
    }

    callback(spikes);
  }
}
