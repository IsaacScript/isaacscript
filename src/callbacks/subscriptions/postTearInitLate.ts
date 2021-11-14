export type PostTearInitLateCallbackType = (tear: EntityTear) => void;

const subscriptions: Array<
  [PostTearInitLateCallbackType, TearVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostTearInitLateCallbackType,
  tearVariant?: TearVariant,
): void {
  subscriptions.push([callback, tearVariant]);
}

export function fire(tear: EntityTear): void {
  for (const [callback, tearVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (tearVariant !== undefined && tearVariant !== tear.Variant) {
      continue;
    }

    callback(tear);
  }
}
