export type PostPlayerInitLateCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<
  [PostPlayerInitLateCallbackType, PlayerVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostPlayerInitLateCallbackType,
  playerVariant?: PlayerVariant,
): void {
  subscriptions.push([callback, playerVariant]);
}

export function fire(player: EntityPlayer): void {
  for (const [callback, playerVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (playerVariant !== undefined && playerVariant !== player.Variant) {
      continue;
    }

    callback(player);
  }
}
