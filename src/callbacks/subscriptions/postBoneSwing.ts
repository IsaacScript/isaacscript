export type PostBoneSwingRegisterParameters = [
  callback: (boneClub: EntityKnife) => void,
];

const subscriptions: PostBoneSwingRegisterParameters[] = [];

/** @internal */
export function postBoneSwingHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postBoneSwingRegister(
  ...args: PostBoneSwingRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postBoneSwingFire(boneClub: EntityKnife): void {
  for (const [callback] of subscriptions) {
    callback(boneClub);
  }
}
