import { PlayerVariant } from "isaac-typescript-definitions";

export type PreBerserkDeathRegisterParameters = [
  callback: (player: EntityPlayer) => boolean | void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PreBerserkDeathRegisterParameters[] = [];

/** @internal */
export function preBerserkDeathHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function preBerserkDeathRegister(
  ...args: PreBerserkDeathRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function preBerserkDeathFire(player: EntityPlayer): boolean | void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }

  return undefined;
}
