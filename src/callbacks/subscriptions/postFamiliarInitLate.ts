export type PostFamiliarInitLateCallbackType = (
  familiar: EntityFamiliar,
) => void;

const subscriptions: Array<
  [PostFamiliarInitLateCallbackType, FamiliarVariant | int | undefined]
> = [];

export function postFamiliarInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postFamiliarInitLateRegister(
  callback: PostFamiliarInitLateCallbackType,
  familiarVariant?: FamiliarVariant | int,
): void {
  subscriptions.push([callback, familiarVariant]);
}

export function postFamiliarInitLateFire(familiar: EntityFamiliar): void {
  for (const [callback, familiarVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (familiarVariant !== undefined && familiarVariant !== familiar.Variant) {
      continue;
    }

    callback(familiar);
  }
}
