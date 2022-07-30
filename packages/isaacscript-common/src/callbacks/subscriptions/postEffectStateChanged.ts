import { EffectVariant } from "isaac-typescript-definitions";

export type PostEffectStateChangedRegisterParameters = [
  callback: (
    effect: EntityEffect,
    previousState: int,
    currentState: int,
  ) => void,
  effectVariant?: EffectVariant,
];

const subscriptions: PostEffectStateChangedRegisterParameters[] = [];

export function postEffectStateChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postEffectStateChangedRegister(
  ...args: PostEffectStateChangedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postEffectStateChangedFire(
  effect: EntityEffect,
  previousState: int,
  currentState: int,
): void {
  for (const [callback, effectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (effectVariant !== undefined && effectVariant !== effect.Variant) {
      continue;
    }

    callback(effect, previousState, currentState);
  }
}
