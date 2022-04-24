export type PostEffectStateChangedCallbackType = (
  effect: EntityEffect,
  previousState: int,
  currentState: int,
) => void;

const subscriptions: Array<
  [PostEffectStateChangedCallbackType, EffectVariant | int | undefined]
> = [];

/** @internal */
export function postEffectStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEffectStateChangedRegister(
  callback: PostEffectStateChangedCallbackType,
  effectVariant?: EffectVariant | int,
): void {
  subscriptions.push([callback, effectVariant]);
}

/** @internal */
export function postEffectStateChangedFire(
  effect: EntityEffect,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, effectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (effectVariant !== undefined && effectVariant !== effect.Variant) {
      continue;
    }

    callback(effect, previousState, currentState);
  }
}
