type CallbackType = (
  familiar: EntityFamiliar,
  previousState: int,
  currentState: int,
) => void;

export type PostFamiliarStateChangedRegisterParameters = [
  callback: CallbackType,
  familiarVariant?: FamiliarVariant,
];

const subscriptions: Array<[CallbackType, FamiliarVariant | int | undefined]> =
  [];

/** @internal */
export function postFamiliarStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFamiliarStateChangedRegister(
  callback: CallbackType,
  familiarVariant?: FamiliarVariant | int,
): void {
  subscriptions.push([callback, familiarVariant]);
}

/** @internal */
export function postFamiliarStateChangedFire(
  familiar: EntityFamiliar,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, familiarVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (familiarVariant !== undefined && familiarVariant !== familiar.Variant) {
      continue;
    }

    callback(familiar, previousState, currentState);
  }
}
