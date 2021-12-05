export type PostTearInitVeryLateCallbackType = (tear: EntityTear) => void;

const subscriptions: Array<
  [PostTearInitVeryLateCallbackType, TearVariant | int | undefined]
> = [];

/** @internal */
export function postTearInitVeryLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTearInitVeryLateRegister(
  callback: PostTearInitVeryLateCallbackType,
  tearVariant?: TearVariant | int,
): void {
  subscriptions.push([callback, tearVariant]);
}

/** @internal */
export function postTearInitVeryLateFire(tear: EntityTear): void {
  for (const [callback, tearVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (tearVariant !== undefined && tearVariant !== tear.Variant) {
      continue;
    }

    callback(tear);
  }
}
