export type PostPEffectUpdateReorderedCallbackType = (
  player: EntityPlayer,
) => void;

const subscriptions: Array<
  [PostPEffectUpdateReorderedCallbackType, PlayerType | undefined]
> = [];

/** @internal */
export function postPEffectUpdateReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postPEffectUpdateReorderedRegister(
  callback: PostPEffectUpdateReorderedCallbackType,
  character?: PlayerType,
): void {
  subscriptions.push([callback, character]);
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
