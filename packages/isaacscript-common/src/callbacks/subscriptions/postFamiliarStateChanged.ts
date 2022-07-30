import { FamiliarVariant } from "isaac-typescript-definitions";

export type PostFamiliarStateChangedRegisterParameters = [
  callback: (
    familiar: EntityFamiliar,
    previousState: int,
    currentState: int,
  ) => void,
  familiarVariant?: FamiliarVariant,
];

const subscriptions: PostFamiliarStateChangedRegisterParameters[] = [];

export function postFamiliarStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFamiliarStateChangedRegister(
  ...args: PostFamiliarStateChangedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postFamiliarStateChangedFire(
  familiar: EntityFamiliar,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, familiarVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (familiarVariant !== undefined && familiarVariant !== familiar.Variant) {
      continue;
    }

    callback(familiar, previousState, currentState);
  }
}
