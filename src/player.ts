import { EXCLUDED_CHARACTERS } from "./constants";
import { game } from "./game";

/**
 * @category Player
 */
export function anyPlayerCloserThan(position: Vector, distance: int): boolean {
  for (const player of getPlayers()) {
    if (player.Position.Distance(position) <= distance) {
      return true;
    }
  }

  return false;
}

/**
 * @category Player
 */
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

/**
 * @category Player
 */
export function anyPlayerHasTrinket(trinketType: TrinketType): boolean {
  for (const player of getPlayers()) {
    if (player.HasTrinket(trinketType)) {
      return true;
    }
  }

  return false;
}

/**
 * @category Player
 */
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
 * Returns the slot number corresponding to where a trinket can be safely inserted.
 *
 * Example:
 * ```
 * const player = Isaac.GetPlayer();
 * const trinketSlot = getOpenTrinketSlotNum(player);
 * if (trinketSlot !== null) {
 *   // They have one or more open trinket slots
 *   player.AddTrinket(TrinketType.TRINKET_SWALLOWED_PENNY);
 * }
 * ```
 *
 * @category Player
 */
export function getOpenTrinketSlot(player: EntityPlayer): int | null {
  const maxTrinkets = player.GetMaxTrinkets();
  const trinket0 = player.GetTrinket(0);
  const trinket1 = player.GetTrinket(1);

  if (maxTrinkets === 1) {
    return trinket0 === TrinketType.TRINKET_NULL ? 0 : null;
  }

  if (maxTrinkets === 2) {
    if (trinket0 === TrinketType.TRINKET_NULL) {
      return 0;
    }
    return trinket1 === TrinketType.TRINKET_NULL ? 1 : null;
  }

  error(`The player has ${maxTrinkets} trinket slots, which is not supported.`);
  return null;
}

/**
 * This function always excludes players with a non-null parent, since they are not real players
 * (e.g. the Strawman Keeper).
 *
 * @param performExclusions Whether or not to exclude characters that are not directly controlled by
 * the player (like Esau). False by default.
 * @category Player
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
