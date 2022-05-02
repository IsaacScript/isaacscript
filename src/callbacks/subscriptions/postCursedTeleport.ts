export type PostCursedTeleportRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostCursedTeleportRegisterParameters[] = [];

/** @internal */
export function postCursedTeleportHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCursedTeleportRegister(
  ...args: PostCursedTeleportRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postCursedTeleportFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
