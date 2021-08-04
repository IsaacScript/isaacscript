import { EXCLUDED_CHARACTERS } from "../constants";
import { game } from "../game";

/**
 * @category Player
 */
export function anyPlayerCloserThan(
  position: Vector,
  distance: float,
): boolean {
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

/**
 * PlayerIndex is a specific type of string; see the documentation for the `getPlayerIndex()`
 * function. Mods can signify that data structures handle EntityPlayers by using this type:
 *
 * ```
 * const myPlayerMap = new LuaTable<PlayerIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type PlayerIndex = string & { __playerIndexBrand: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Mods often have to track variables relating to the player. In naive mods, information will only
 * be stored about the first player. However, in order to be robust, mods must handle up to 4
 * players playing at the same time. This means that information must be stored on a map data
 * structure. Finding a good index for these types of map data structures is difficult:
 *
 * - We cannot use the index from `Isaac.GetPlayer(i)` since this fails in the case where there are
 *   two players and the first player leaves the run.
 * - We cannot use `EntityPlayer.ControllerIndex` as an index because it fails in the case of Jacob
 *   & Esau or Tainted Forgotten. It also fails in the case of a player changing their controls
 *   mid-run.
 * - We cannot use `EntityPlayer.GetData().index` because it does not persist across saving and
 *   continuing.
 * - We cannot use `GetPtrHash()` as an index because it does not persist across exiting and
 *   relaunching the game.
 *
 * Instead, we use `EntityPlayer.GetCollectibleRNG()` with an arbitrary value of 1 (i.e. Sad Onion).
 * This works even if the player does not have any Sad Onions. We also convert the numerical seed to
 * a string to avoid null element creation when saving the table as JSON (which is necessary when
 * saving variables on run exit).
 *
 * Finally, this index fails in the case of Tainted Lazarus 2, since the RNG will be the same for both
 * Tainted Lazarus and Dead Tainted Lazarus. We revert to using "GetPtrHash()" for this case.
 */
export function getPlayerIndex(player: EntityPlayer): PlayerIndex {
  const character = player.GetPlayerType();

  if (character === PlayerType.PLAYER_LAZARUS2_B) {
    return GetPtrHash(player).toString() as PlayerIndex;
  }

  return player.GetCollectibleRNG(1).GetSeed().toString() as PlayerIndex;
}

/**
 * Returns the total number of collectibles amongst all players. For example, if player 1 has 1 Sad
 * Onion and player 2 has 2 Sad Onions, then this function would return 3.
 *
 * @category Player
 */
export function getTotalPlayerCollectibles(
  collectibleType: CollectibleType,
): int {
  let numCollectibles = 0;
  for (const player of getPlayers()) {
    numCollectibles += player.GetCollectibleNum(collectibleType);
  }

  return numCollectibles;
}
