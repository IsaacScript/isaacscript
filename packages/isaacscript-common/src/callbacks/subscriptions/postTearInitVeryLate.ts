import { TearVariant } from "isaac-typescript-definitions";

export type PostTearInitVeryLateRegisterParameters = [
  callback: (tear: EntityTear) => void,
  tearVariant?: TearVariant,
];

const subscriptions: PostTearInitVeryLateRegisterParameters[] = [];

export function postTearInitVeryLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postTearInitVeryLateRegister(
  ...args: PostTearInitVeryLateRegisterParameters
): void {
  subscriptions.push(args);
}

export function postTearInitVeryLateFire(tear: EntityTear): void {
  for (const [callback, tearVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (tearVariant !== undefined && tearVariant !== tear.Variant) {
      continue;
    }

    callback(tear);
  }
}
