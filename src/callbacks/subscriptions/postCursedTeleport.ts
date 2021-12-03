/** @internal */
export type PostCursedTeleportCallbackType = (player: EntityPlayer) => void;

const subscriptions: Array<[PostCursedTeleportCallbackType]> = [];

/** @internal */
export function postCursedTeleportHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCursedTeleportRegister(
  callback: PostCursedTeleportCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postCursedTeleportFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
