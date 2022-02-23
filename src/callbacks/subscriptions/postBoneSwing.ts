export type PostBoneSwingCallbackType = (boneClub: EntityKnife) => void;

const subscriptions: Array<[PostBoneSwingCallbackType]> = [];

/** @internal */
export function postBoneSwingHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postBoneSwingRegister(
  callback: PostBoneSwingCallbackType,
): void {
  subscriptions.push([callback]);
}

/** @internal */
export function postBoneSwingFire(boneClub: EntityKnife): void {
  for (const [callback] of subscriptions) {
    callback(boneClub);
  }
}
