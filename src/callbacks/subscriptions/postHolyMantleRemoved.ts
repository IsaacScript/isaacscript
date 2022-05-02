export type PostHolyMantleRemovedRegisterParameters = [
  callback: (
    player: EntityPlayer,
    oldNumHolyMantles: int,
    newNumHolyMantles: int,
  ) => void,
  playerVariant?: PlayerVariant | int,
  character?: PlayerType | int,
];

const subscriptions: PostHolyMantleRemovedRegisterParameters[] = [];

/** @internal */
export function postHolyMantleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postHolyMantleRemovedRegister(
  ...args: PostHolyMantleRemovedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postHolyMantleRemovedFire(
  player: EntityPlayer,
  oldNumHolyMantles: int,
  newNumHolyMantles: int,
): void {
  for (const [callback] of subscriptions) {
    callback(player, oldNumHolyMantles, newNumHolyMantles);
  }
}
