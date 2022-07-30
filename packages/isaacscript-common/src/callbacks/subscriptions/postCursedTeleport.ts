export type PostCursedTeleportRegisterParameters = [
  callback: (player: EntityPlayer) => void,
];

const subscriptions: PostCursedTeleportRegisterParameters[] = [];

export function postCursedTeleportHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postCursedTeleportRegister(
  ...args: PostCursedTeleportRegisterParameters
): void {
  subscriptions.push(args);
}

export function postCursedTeleportFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
