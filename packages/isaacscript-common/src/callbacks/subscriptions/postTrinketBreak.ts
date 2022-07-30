import { TrinketType } from "isaac-typescript-definitions";

export type PostTrinketBreakRegisterParameters = [
  callback: (player: EntityPlayer, trinketType: TrinketType) => void,
  trinketType?: TrinketType,
];

const subscriptions: PostTrinketBreakRegisterParameters[] = [];

export function postTrinketBreakHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postTrinketBreakRegister(
  ...args: PostTrinketBreakRegisterParameters
): void {
  subscriptions.push(args);
}

export function postTrinketBreakFire(
  player: EntityPlayer,
  trinketType: TrinketType,
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
