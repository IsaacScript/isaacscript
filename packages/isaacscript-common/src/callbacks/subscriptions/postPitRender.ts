import { PitVariant } from "isaac-typescript-definitions";

export type PostPitRenderRegisterParameters = [
  callback: (pit: GridEntityPit) => void,
  pitVariant?: PitVariant,
];

const subscriptions: PostPitRenderRegisterParameters[] = [];

export function postPitRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPitRenderRegister(
  ...args: PostPitRenderRegisterParameters
): void {
  subscriptions.push(args);
}

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
