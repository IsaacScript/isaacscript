import { PitVariant } from "isaac-typescript-definitions";

export type PostPitUpdateRegisterParameters = [
  callback: (pit: GridEntityPit) => void,
  pitVariant?: PitVariant,
];

const subscriptions: PostPitUpdateRegisterParameters[] = [];

export function postPitUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPitUpdateRegister(
  ...args: PostPitUpdateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPitUpdateFire(pit: GridEntityPit): void {
  const pitVariant = pit.GetVariant();

  for (const [callback, callbackPitVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (callbackPitVariant !== undefined && callbackPitVariant !== pitVariant) {
      continue;
    }

    callback(pit);
  }
}
