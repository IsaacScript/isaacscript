export type PostEffectInitLateCallbackType = (effect: EntityEffect) => void;

const subscriptions: Array<
  [PostEffectInitLateCallbackType, EffectVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostEffectInitLateCallbackType,
  effectVariant?: EffectVariant,
): void {
  subscriptions.push([callback, effectVariant]);
}

export function fire(effect: EntityEffect): void {
  for (const [callback, effectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (effectVariant !== undefined && effectVariant !== effect.Variant) {
      continue;
    }

    callback(effect);
  }
}
