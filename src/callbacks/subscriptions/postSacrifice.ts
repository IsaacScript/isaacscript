export type PostSacrificeCallbackType = (
  player: EntityPlayer,
  numSacrifices: int,
) => void;

const subscriptions: Array<[PostSacrificeCallbackType]> = [];

export function postSacrificeHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSacrificeRegister(
  callback: PostSacrificeCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postSacrificeFire(
  player: EntityPlayer,
  numSacrifices: int,
): void {
  for (const [callback] of subscriptions) {
    callback(player, numSacrifices);
  }
}
