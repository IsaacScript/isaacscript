import { EXCLUDED_CHARACTERS } from "./constants";
import { game } from "./game";

export function anyPlayerCloserThan(position: Vector, distance: int): boolean {
  for (const player of getPlayers()) {
    if (player.Position.Distance(position) <= distance) {
      return true;
    }
  }

  return false;
}

export function anyPlayerHasCollectible(
  collectibleType: CollectibleType,
): boolean {
  for (const player of getPlayers()) {
    if (player.HasCollectible(collectibleType)) {
      return true;
    }
  }

  return false;
}

export function anyPlayerHasTrinket(trinketType: TrinketType): boolean {
  for (const player of getPlayers()) {
    if (player.HasTrinket(trinketType)) {
      return true;
    }
  }

  return false;
}

export function anyPlayerIs(matchingCharacter: PlayerType): boolean {
  for (const player of getPlayers()) {
    const character = player.GetPlayerType();
    if (character === matchingCharacter) {
      return true;
    }
  }

  return false;
}

/**
 * This function always excludes players with a non-null parent, since they are not real players
 * (e.g. the Strawman Keeper).
 *
 * @param performExclusions Whether or not to exclude characters that are not directly controlled by
 * the player (like Esau). False by default.
 */
export function getPlayers(performExclusions = false): EntityPlayer[] {
  const players: EntityPlayer[] = [];
  for (let i = 0; i < game.GetNumPlayers(); i++) {
    const player = Isaac.GetPlayer(i);
    if (player !== null && player.Parent === null) {
      // We might only want to make a list of players that are fully-functioning and controlled by
      // humans
      // Thus, we need to exclude certain characters
      const character = player.GetPlayerType();
      if (!performExclusions || !EXCLUDED_CHARACTERS.includes(character)) {
        players.push(player);
      }
    }
  }

  return players;
}
