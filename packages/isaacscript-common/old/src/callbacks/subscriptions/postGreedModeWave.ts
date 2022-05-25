export type PostGreedModeWaveRegisterParameters = [
  callback: (oldWave: int, newWave: int) => void,
];

const subscriptions: PostGreedModeWaveRegisterParameters[] = [];

/** @internal */
export function postGreedModeWaveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGreedModeWaveRegister(
  ...args: PostGreedModeWaveRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postGreedModeWaveFire(oldWave: int, newWave: int): void {
  for (const [callback] of subscriptions) {
    callback(oldWave, newWave);
  }
}
