import { PlayerVariant } from "isaac-typescript-definitions";

export type PostPlayerInitReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PostPlayerInitReorderedRegisterParameters[] = [];

/** @internal */
export function postPlayerInitReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerInitReorderedRegister(
  ...args: PostPlayerInitReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerInitReorderedFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
