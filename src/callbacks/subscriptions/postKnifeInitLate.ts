export type PostKnifeInitLateCallbackType = (knife: EntityKnife) => void;

const subscriptions: Array<
  [PostKnifeInitLateCallbackType, KnifeVariant | int | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostKnifeInitLateCallbackType,
  knifeVariant?: KnifeVariant | int,
): void {
  subscriptions.push([callback, knifeVariant]);
}

export function fire(knife: EntityKnife): void {
  for (const [callback, knifeVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (knifeVariant !== undefined && knifeVariant !== knife.Variant) {
      continue;
    }

    callback(knife);
  }
}
