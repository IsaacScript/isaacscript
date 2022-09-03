import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PreGetPedestalRegisterParameters = [
  callback: (
    player: EntityPlayer,
    pickup: EntityPickupCollectible,
  ) => boolean | undefined,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
];

const subscriptions: PreGetPedestalRegisterParameters[] = [];

export function preGetPedestalHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function preGetPedestalRegister(
  ...args: PreGetPedestalRegisterParameters
): void {
  subscriptions.push(args);
}

export function preGetPedestalFire(
  player: EntityPlayer,
  collectible: EntityPickupCollectible,
): boolean | undefined {
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

    const returnValue = callback(player, collectible);
    if (returnValue !== undefined) {
      return returnValue;
    }
  }

  return undefined;
}
