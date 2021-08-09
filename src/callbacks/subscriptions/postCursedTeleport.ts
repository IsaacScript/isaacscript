export type PostCursedTeleportCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostCursedTeleportCallbackType]> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(callback: PostCursedTeleportCallbackType): void {
  subscriptions.push([callback]);
}

export function fire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
