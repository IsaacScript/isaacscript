import { PlayerType, PlayerVariant } from "isaac-typescript-definitions";

export type PostCursedTeleportRegisterParameters = [
  callback: (player: EntityPlayer) => void,
  playerVariant?: PlayerVariant,
  character?: PlayerType,
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
