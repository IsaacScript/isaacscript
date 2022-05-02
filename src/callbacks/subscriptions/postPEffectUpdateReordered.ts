export type PostPEffectUpdateReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant | int,
  character?: PlayerType | int,
];

const subscriptions: PostPEffectUpdateReorderedRegisterParameters[] = [];

/** @internal */
export function postPEffectUpdateReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPEffectUpdateReorderedRegister(
  ...args: PostPEffectUpdateReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postPEffectUpdateReorderedFire(player: EntityPlayer): void {
  const character = player.GetPlayerType();

  for (const [callback, callbackCharacter] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      continue;
    }

    callback(player);
  }
}
