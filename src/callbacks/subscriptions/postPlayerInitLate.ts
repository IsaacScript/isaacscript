export type PostPlayerInitLateRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
];

const subscriptions: PostPlayerInitLateRegisterParameters[] = [];

/** @internal */
export function postPlayerInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPlayerInitLateRegister(
  ...args: PostPlayerInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPlayerInitLateFire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
