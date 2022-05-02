type CallbackType = (boneClub: EntityKnife) => void;

export type PostBoneSwingRegisterParameters = [callback: CallbackType];

const subscriptions: PostBoneSwingRegisterParameters[] = [];

/** @internal */
export function postBoneSwingHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postBoneSwingRegister(callback: CallbackType): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postBoneSwingFire(boneClub: EntityKnife): void {
  for (const [callback] of subscriptions) {
    callback(boneClub);
  }
}
