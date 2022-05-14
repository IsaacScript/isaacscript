import { TearVariant } from "isaac-typescript-definitions";

export type PostTearInitLateRegisterParameters = [
  callback: (tear: EntityTear) => void,
  tearVariant?: TearVariant | int,
];

const subscriptions: PostTearInitLateRegisterParameters[] = [];

/** @internal */
export function postTearInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTearInitLateRegister(
  ...args: PostTearInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postTearInitLateFire(tear: EntityTear): void {
  for (const [callback, tearVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (tearVariant !== undefined && tearVariant !== tear.Variant) {
      continue;
    }

    callback(tear);
  }
}
