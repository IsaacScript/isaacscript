import { KnifeVariant } from "isaac-typescript-definitions";

export type PostKnifeInitLateRegisterParameters = [
  callback: (knife: EntityKnife) => void,
  knifeVariant?: KnifeVariant,
];

const subscriptions: PostKnifeInitLateRegisterParameters[] = [];

/** @internal */
export function postKnifeInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postKnifeInitLateRegister(
  ...args: PostKnifeInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postKnifeInitLateFire(knife: EntityKnife): void {
  for (const [callback, knifeVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (knifeVariant !== undefined && knifeVariant !== knife.Variant) {
      continue;
    }

    callback(knife);
  }
}
