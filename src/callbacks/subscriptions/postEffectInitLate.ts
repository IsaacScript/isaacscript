import { EffectVariant } from "isaac-typescript-definitions";

export type PostEffectInitLateRegisterParameters = [
  callback: (effect: EntityEffect) => void,
  effectVariant?: EffectVariant | int,
];

const subscriptions: PostEffectInitLateRegisterParameters[] = [];

/** @internal */
export function postEffectInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postEffectInitLateRegister(
  ...args: PostEffectInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postEffectInitLateFire(effect: EntityEffect): void {
  for (const [callback, effectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (effectVariant !== undefined && effectVariant !== effect.Variant) {
      continue;
    }

    callback(effect);
  }
}
