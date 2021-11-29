export type PostCursedTeleportCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostCursedTeleportCallbackType]> = [];

export function postCursedTeleportHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postCursedTeleportRegister(
  callback: PostCursedTeleportCallbackType,
): void {
  subscriptions.push([callback]);
}

export function postCursedTeleportFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
