type CallbackType = (effect: EntityEffect) => void;

export type PostEffectInitLateRegisterParameters = [
  callback: CallbackType,
  effectVariant?: EffectVariant | int,
];

const subscriptions: Array<[CallbackType, EffectVariant | int | undefined]> =
  [];

/** @internal */
export function postEffectInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEffectInitLateRegister(
  callback: CallbackType,
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
