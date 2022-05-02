type CallbackType = (oldWave: int, newWave: int) => void;

export type PostGreedModeWaveRegisterParameters = [callback: CallbackType];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postGreedModeWaveHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postGreedModeWaveRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postGreedModeWaveFire(oldWave: int, newWave: int): void {
  for (const [callback] of subscriptions) {
    callback(oldWave, newWave);
  }
}
