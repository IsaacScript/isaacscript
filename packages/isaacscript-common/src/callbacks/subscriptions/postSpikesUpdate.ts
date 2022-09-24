export type PostSpikesUpdateRegisterParameters = [
  callback: (spikes: GridEntitySpikes) => void,
  variant?: int,
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
  const variant = spikes.GetVariant();

  for (const [callback, callbackVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(spikes);
  }
}
