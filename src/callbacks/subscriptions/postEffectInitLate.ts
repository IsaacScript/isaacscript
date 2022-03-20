export type PostEffectInitLateCallbackType = (effect: EntityEffect) => void;

const subscriptions: Array<
  [PostEffectInitLateCallbackType, EffectVariant | int | undefined]
> = [];

/** @internal */
export function postEffectInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEffectInitLateRegister(
  callback: PostEffectInitLateCallbackType,
  effectVariant?: EffectVariant | int,
): void {
  subscriptions.push([callback, effectVariant]);
}

/** @internal */
export function postEffectInitLateFire(effect: EntityEffect): void {
  for (const [callback, effectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (effectVariant !== undefined && effectVariant !== effect.Variant) {
      continue;
    }

    callback(effect);
  }
}
