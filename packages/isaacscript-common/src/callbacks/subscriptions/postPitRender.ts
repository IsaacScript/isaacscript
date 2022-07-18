import { PitVariant } from "isaac-typescript-definitions";

export type PostPitRenderRegisterParameters = [
  callback: (pit: GridEntityPit) => void,
  pitVariant?: PitVariant,
];

const subscriptions: PostPitRenderRegisterParameters[] = [];

/** @internal */
export function postPitRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPitRenderRegister(
  ...args: PostPitRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPitRenderFire(pit: GridEntityPit): void {
  const pitVariant = pit.GetVariant();

  for (const [callback, callbackPitVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackPitVariant !== undefined && callbackPitVariant !== pitVariant) {
      continue;
    }

    callback(pit);
  }
}
