import { TearVariant } from "isaac-typescript-definitions";

export type PostTearInitLateRegisterParameters = [
  callback: (tear: EntityTear) => void,
  tearVariant?: TearVariant,
];

const subscriptions: PostTearInitLateRegisterParameters[] = [];

export function postTearInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postTearInitLateRegister(
  ...args: PostTearInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postTearInitLateFire(tear: EntityTear): void {
  for (const [callback, tearVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (tearVariant !== undefined && tearVariant !== tear.Variant) {
      continue;
    }

    callback(tear);
  }
}
