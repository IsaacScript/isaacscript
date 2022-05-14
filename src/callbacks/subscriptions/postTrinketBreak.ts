import { TrinketType } from "isaac-typescript-definitions";

export type PostTrinketBreakRegisterParameters = [
  callback: (player: EntityPlayer, trinketType: TrinketType | int) => void,
  trinketType?: TrinketType | int,
];

const subscriptions: PostTrinketBreakRegisterParameters[] = [];

/** @internal */
export function postTrinketBreakHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postTrinketBreakRegister(
  ...args: PostTrinketBreakRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postTrinketBreakFire(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): void {
  for (const [callback, callbackTrinketType] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackTrinketType !== undefined &&
      callbackTrinketType !== trinketType
    ) {
      continue;
    }

    callback(player, trinketType);
  }
}
