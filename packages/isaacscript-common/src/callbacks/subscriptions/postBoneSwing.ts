export type PostBoneSwingRegisterParameters = [
  callback: (boneClub: EntityKnife) => void,
];

const subscriptions: PostBoneSwingRegisterParameters[] = [];

export function postBoneSwingHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postBoneSwingRegister(
  ...args: PostBoneSwingRegisterParameters
): void {
  subscriptions.push(args);
}

export function postBoneSwingFire(boneClub: EntityKnife): void {
  for (const [callback] of subscriptions) {
    callback(boneClub);
  }
}
