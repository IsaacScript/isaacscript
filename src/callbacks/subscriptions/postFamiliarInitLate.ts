import { FamiliarVariant } from "isaac-typescript-definitions";

export type PostFamiliarInitLateRegisterParameters = [
  callback: (familiar: EntityFamiliar) => void,
  familiarVariant?: FamiliarVariant | int,
];

const subscriptions: PostFamiliarInitLateRegisterParameters[] = [];

/** @internal */
export function postFamiliarInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFamiliarInitLateRegister(
  ...args: PostFamiliarInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postFamiliarInitLateFire(familiar: EntityFamiliar): void {
  for (const [callback, familiarVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (familiarVariant !== undefined && familiarVariant !== familiar.Variant) {
      continue;
    }

    callback(familiar);
  }
}
