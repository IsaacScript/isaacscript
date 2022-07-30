export type PostSpikesUpdateRegisterParameters = [
  callback: (spikes: GridEntitySpikes) => void,
  gridEntityVariant?: int,
];

const subscriptions: PostSpikesUpdateRegisterParameters[] = [];

export function postSpikesUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSpikesUpdateRegister(
  ...args: PostSpikesUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postSpikesUpdateFire(spikes: GridEntitySpikes): void {
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
