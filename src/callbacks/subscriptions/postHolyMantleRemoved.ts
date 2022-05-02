export type PostHolyMantleRemovedCallbackType = (
  player: EntityPlayer,
  oldNumHolyMantles: int,
  newNumHolyMantles: int,
) => void;

const subscriptions: Array<
  [
    PostHolyMantleRemovedCallbackType,
    PlayerVariant | int | undefined,
    PlayerType | int | undefined,
  ]
> = [];

/** @internal */
export function postHolyMantleRemovedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postHolyMantleRemovedRegister(
  callback: PostHolyMantleRemovedCallbackType,
  playerVariant: PlayerVariant | int | undefined,
  character: PlayerType | int | undefined,
): void {
  subscriptions.push([callback, playerVariant, character]);
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
