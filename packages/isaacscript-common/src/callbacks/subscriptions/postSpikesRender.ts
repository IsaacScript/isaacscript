export type PostSpikesRenderRegisterParameters = [
  callback: (spikes: GridEntitySpikes) => void,
  variant?: int,
];

const subscriptions: PostSpikesRenderRegisterParameters[] = [];

export function postSpikesRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSpikesRenderRegister(
  ...args: PostSpikesRenderRegisterParameters
): void {
  subscriptions.push(args);
}

export function postSpikesRenderFire(spikes: GridEntitySpikes): void {
  const variant = spikes.GetVariant();

  for (const [callback, callbackVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackVariant !== undefined && callbackVariant !== variant) {
      continue;
    }

    callback(spikes);
  }
}
