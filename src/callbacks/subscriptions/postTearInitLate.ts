export type PostTearInitLateCallbackType = (tear: EntityTear) => void;

const subscriptions: Array<
  [PostTearInitLateCallbackType, TearVariant | int | undefined]
> = [];

/** @internal */
export function postTearInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTearInitLateRegister(
  callback: PostTearInitLateCallbackType,
  tearVariant?: TearVariant | int,
): void {
  subscriptions.push([callback, tearVariant]);
}

/** @internal */
export function postTearInitLateFire(tear: EntityTear): void {
  for (const [callback, tearVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (tearVariant !== undefined && tearVariant !== tear.Variant) {
      continue;
    }

    callback(tear);
  }
}
