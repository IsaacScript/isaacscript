import {
  BabySubType,
  CollectibleType,
  PlayerType,
  PlayerVariant,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import type { PlayerIndex } from "../types/PlayerIndex";
import { ReadonlySet } from "../types/ReadonlySet";

const DEFAULT_COLLECTIBLE_TYPE = CollectibleType.SAD_ONION;

const EXCLUDED_CHARACTERS = new ReadonlySet<PlayerType>([
  PlayerType.ESAU, // 20
  PlayerType.SOUL_B, // 40
]);

/**
 * Helper function to get every player with no restrictions, by using `Game.GetNumPlayers` and
 * `Isaac.GetPlayer`.
 *
 * This function is almost never what you want to use. For most purposes, use the `getPlayers`
 * helper function instead to get a filtered list of players.
 */
export function getAllPlayers(): readonly EntityPlayer[] {
  const numPlayers = game.GetNumPlayers();

  const players: EntityPlayer[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    players.push(player);
  }

  return players;
}

/**
 * Helper function to get all of the other players in the room besides the one provided. (This
 * includes "child" players.)
 */
export function getOtherPlayers(player: EntityPlayer): readonly EntityPlayer[] {
  const playerPtrHash = GetPtrHash(player);
  const players = getAllPlayers();
  return players.filter(
    (otherPlayer) => GetPtrHash(otherPlayer) !== playerPtrHash,
  );
}

/**
 * Helper function to get the corresponding `EntityPlayer` object that corresponds to a
 * `PlayerIndex`.
 */
export function getPlayerFromIndex(
  playerIndex: PlayerIndex,
): EntityPlayer | undefined {
  const players = getAllPlayers();
  return players.find((player) => getPlayerIndex(player) === playerIndex);
}

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
 * - We cannot use `EntityPlayer.InitSeed` because it is not consistent with additional players
 *   beyond the first.
 *
 * Instead, we use the `EntityPlayer.GetCollectibleRNG` method with an arbitrary value of Sad Onion
 * (1). This works even if the player does not have any Sad Onions.
 *
 * Note that by default, this returns the same index for both The Forgotten and The Soul. (Even
 * though they are technically different characters, they share the same inventory and `InitSeed`.)
 * If this is not desired, pass true for the `differentiateForgottenAndSoul` argument, and the RNG
 * of Spoon Bender (3) will be used for The Soul.
 *
 * Also note that this index does not work in the `POST_PLAYER_INIT` function for players 2 through
 * 4. With that said, in almost all cases, you should be lazy-initializing your data structures in
 * other callbacks, so this should not be an issue.
 */
export function getPlayerIndex(
  player: EntityPlayer,
  differentiateForgottenAndSoul = false,
): PlayerIndex {
  // Sub-players use separate RNG values for some reason, so we need to always use the main player:
  // https://github.com/Meowlala/RepentanceAPIIssueTracker/issues/443

  // We can safely ignore the player's character because regardless of whether the main player ends
  // up being The Forgotten or The Soul, the collectible RNG values will be the same. The
  // `EntityPlayer.IsSubPlayer` method can return true for Dead Tainted Lazarus during the
  // `POST_PLAYER_INIT` callback, but since we fall back to the player in the case of
  // "getSubPlayerParent" returning undefined, we do not need to explicitly check for this case.
  let playerToUse = player;
  const isSubPlayer = player.IsSubPlayer();
  if (isSubPlayer) {
    const subPlayer = player as EntitySubPlayer;

    // The "getSubPlayerParent" function will return undefined in the situation where we are on Dead
    // Tainted Lazarus in the `POST_PLAYER_INIT` callback.
    const playerParent = getSubPlayerParent(subPlayer);
    if (playerParent !== undefined) {
      playerToUse = playerParent;
    }
  }

  const collectibleType = getPlayerIndexCollectibleType(
    player,
    differentiateForgottenAndSoul,
  );
  const collectibleRNG = playerToUse.GetCollectibleRNG(collectibleType);
  const seed = collectibleRNG.GetSeed();

  return seed as unknown as PlayerIndex;
}

function getPlayerIndexCollectibleType(
  player: EntityPlayer,
  differentiateForgottenAndSoul: boolean,
) {
  const character = player.GetPlayerType();

  if (character === PlayerType.SOUL) {
    return differentiateForgottenAndSoul
      ? CollectibleType.INNER_EYE
      : DEFAULT_COLLECTIBLE_TYPE;
  }

  return DEFAULT_COLLECTIBLE_TYPE;
}

/**
 * Helper function to return the index of this player with respect to the output of the
 * `Isaac.GetPlayer` method.
 *
 * Note that if you storing information about a player in a data structure, you never want to use
 * this index; use the `getPlayerIndex` function instead.
 */
export function getPlayerIndexVanilla(
  playerToFind: EntityPlayer,
): int | undefined {
  const numPlayers = game.GetNumPlayers();
  const playerToFindHash = GetPtrHash(playerToFind);

  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    const playerHash = GetPtrHash(player);
    if (playerHash === playerToFindHash) {
      return i;
    }
  }

  return undefined;
}

/**
 * This function always excludes players with a non-undefined parent, since they are not real
 * players (e.g. the Strawman Keeper).
 *
 * If this is not desired, use the `getAllPlayers` helper function instead.
 *
 * @param performCharacterExclusions Whether to exclude characters that are not directly controlled
 *                                 by the player (i.e. Esau & Tainted Soul). Default is false.
 */
export function getPlayers(
  performCharacterExclusions = false,
): readonly EntityPlayer[] {
  const players = getAllPlayers();
  const nonChildPlayers = players.filter((player) => !isChildPlayer(player));
  const nonChildPlayersFiltered = nonChildPlayers.filter((player) => {
    const character = player.GetPlayerType();
    return !EXCLUDED_CHARACTERS.has(character);
  });

  return performCharacterExclusions ? nonChildPlayersFiltered : nonChildPlayers;
}

/**
 * Helper function to get a parent `EntityPlayer` object for a given `EntitySubPlayer` object. This
 * is useful because calling the `EntityPlayer.GetSubPlayer` method on a sub-player object will
 * return undefined.
 */
export function getSubPlayerParent(
  subPlayer: EntitySubPlayer,
): EntityPlayer | undefined {
  const subPlayerPtrHash = GetPtrHash(subPlayer);
  const players = getPlayers();

  return players.find((player) => {
    const thisPlayerSubPlayer = player.GetSubPlayer();
    if (thisPlayerSubPlayer === undefined) {
      return false;
    }

    const thisPlayerSubPlayerPtrHash = GetPtrHash(thisPlayerSubPlayer);
    return thisPlayerSubPlayerPtrHash === subPlayerPtrHash;
  });
}

/**
 * Helper function to detect if a particular player is a "child" player, meaning that they have a
 * non-undefined `EntityPlayer.Parent` field. (For example, the Strawman Keeper.)
 */
export function isChildPlayer(player: EntityPlayer): boolean {
  return player.Parent !== undefined;
}

/**
 * Helper function to detect if a particular player is the Found Soul player provided by the
 * trinket.
 */
export function isFoundSoul(player: EntityPlayer): boolean {
  return (
    isChildPlayer(player)
    && player.Variant === PlayerVariant.COOP_BABY
    && player.SubType === (BabySubType.FOUND_SOUL as int)
  );
}
