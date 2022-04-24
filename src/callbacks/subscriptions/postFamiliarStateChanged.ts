export type PostFamiliarStateChangedCallbackType = (
  familiar: EntityFamiliar,
  previousState: int,
  currentState: int,
) => void;

const subscriptions: Array<
  [PostFamiliarStateChangedCallbackType, FamiliarVariant | int | undefined]
> = [];

/** @internal */
export function postFamiliarStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postFamiliarStateChangedRegister(
  callback: PostFamiliarStateChangedCallbackType,
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
