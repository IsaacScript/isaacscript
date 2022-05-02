type CallbackType = (player: EntityPlayer) => void;

export type PostCursedTeleportRegisterParameters = [callback: CallbackType];

const subscriptions: Array<[CallbackType]> = [];

/** @internal */
export function postCursedTeleportHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCursedTeleportRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postCursedTeleportFire(player: EntityPlayer): void {
  for (const [callback] of subscriptions) {
    callback(player);
  }
}
