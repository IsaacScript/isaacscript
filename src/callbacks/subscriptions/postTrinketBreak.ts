export type PostTrinketBreakCallbackType = (
  player: EntityPlayer,
  trinketType: TrinketType | int,
) => void;

const subscriptions: Array<
  [PostTrinketBreakCallbackType, TrinketType | int | undefined]
> = [];

/** @internal */
export function postTrinketBreakHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTrinketBreakRegister(
  callback: PostTrinketBreakCallbackType,
  trinketType?: TrinketType | int,
): void {
  subscriptions.push([callback, trinketType]);
}

/** @internal */
export function postTrinketBreakFire(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): void {
  for (const [callback, callbackTrinketType] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackTrinketType !== undefined &&
      callbackTrinketType !== trinketType
    ) {
      continue;
    }

    callback(player, trinketType);
  }
}
