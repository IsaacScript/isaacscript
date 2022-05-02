type CallbackType = (
  effect: EntityEffect,
  previousState: int,
  currentState: int,
) => void;

export type PostEffectStateChangedRegisterParameters = [
  callback: CallbackType,
  effectVariant?: EffectVariant,
];

const subscriptions: Array<[CallbackType, EffectVariant | int | undefined]> =
  [];

/** @internal */
export function postEffectStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEffectStateChangedRegister(
  callback: CallbackType,
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
