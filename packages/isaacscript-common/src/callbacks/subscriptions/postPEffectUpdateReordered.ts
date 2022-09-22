import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostPEffectUpdateReorderedRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PostPEffectUpdateReorderedRegisterParameters[] = [];

export function postPEffectUpdateReorderedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postPEffectUpdateReorderedRegister(
  ...args: PostPEffectUpdateReorderedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postPEffectUpdateReorderedFire(player: EntityPlayer): void {
  const character = player.GetPlayerType();

  for (const [
    callback,
    callbackPlayerVariant,
    callbackCharacter,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackPlayerVariant !== undefined &&
      callbackPlayerVariant !== player.Variant
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (callbackCharacter !== undefined && callbackCharacter !== character) {
      continue;
    }

    callback(player);
  }
}
