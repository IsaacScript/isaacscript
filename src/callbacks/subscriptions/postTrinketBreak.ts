export type PostTrinketBreakCallbackType = (
  player: EntityPlayer,
  trinketType: TrinketType,
) => void;

const subscriptions: Array<
  [PostTrinketBreakCallbackType, TrinketType | undefined]
> = [];

/** @internal */
export function postTrinketBreakHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTrinketBreakRegister(
  callback: PostTrinketBreakCallbackType,
  trinketType?: TrinketType,
): void {
  subscriptions.push([callback, trinketType]);
}

/** @internal */
export function postTrinketBreakFire(
  player: EntityPlayer,
  trinketType: TrinketType,
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
