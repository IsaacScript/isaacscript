export type PostSacrificeCallbackType = (
  player: EntityPlayer,
  numSacrifices: int,
) => void;

const subscriptions: Array<[PostSacrificeCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostSacrificeCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer, numSacrifices: int): void {
  for (const [callback] of subscriptions) {
    callback(player, numSacrifices);
  }
}
