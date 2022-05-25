import { CollectibleType, PlayerType } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { PlayerIndex } from "../types/PlayerIndex";

const DEFAULT_COLLECTIBLE_TYPE = CollectibleType.SAD_ONION;

const EXCLUDED_CHARACTERS: ReadonlySet<PlayerType> = new Set([
  PlayerType.ESAU, // 20
  PlayerType.THE_SOUL_B, // 40
]);

/**
 * Helper function to get every player with no restrictions, by using `Game.GetNumPlayers` and
 * `Isaac.GetPlayer`.
 *
 * This function is almost never what you want to use. For most purposes, use the `getPlayers`
 * helper function instead to get a filtered list of players.
 */
export function getAllPlayers(): EntityPlayer[] {
  const numPlayers = game.GetNumPlayers();

  const players: EntityPlayer[] = [];
  for (let i = 0; i < numPlayers; i++) {
    const player = Isaac.GetPlayer(i);
    players.push(player);
  }

  return players;
}

export function getPlayerFromIndex(
  playerIndex: PlayerIndex,
): EntityPlayer | undefined {
  const players = getPlayers();
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
 * Since the RNG value is the same for both Tainted Lazarus and Dead Tainted Lazarus, we revert to
 * using the RNG of The Inner Eye (2) for Dead Tainted Lazarus.
 *
 * Note that by default, this returns the same index for both The Forgotten and The Soul. (Even
 * though they are technically different characters, they share the same inventory and InitSeed.) If
 * this is not desired, pass true for the `differentiateForgottenAndSoul` argument, and the RNG of
 * Spoon Bender (3) will be used for The Soul.
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
  // PostPlayerInit callback, but since we fall back to the player in the case of
  // "getSubPlayerParent" returning undefined, we do not need to explicitly check for this case.
  let playerToUse = player;
  const isSubPlayer = player.IsSubPlayer();
  if (isSubPlayer) {
    // The "getSubPlayerParent" function will return undefined in the situation where we are on Dead
    // Tainted Lazarus in the PostPlayerInit callback.
    const playerParent = getSubPlayerParent(player as EntitySubPlayer);
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

  switch (character) {
    // 17
    case PlayerType.THE_SOUL: {
      return differentiateForgottenAndSoul
        ? CollectibleType.SPOON_BENDER
        : DEFAULT_COLLECTIBLE_TYPE;
    }

    // 38
    case PlayerType.LAZARUS_2_B: {
      return CollectibleType.INNER_EYE;
    }

    default: {
      return DEFAULT_COLLECTIBLE_TYPE;
    }
  }
}

/**
 * Helper function to return the index of this player with respect to the output of the
 * `Isaac.GetPlayer` method.
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
 * @param performCharacterExclusions Whether or not to exclude characters that are not directly
 *                                 controlled by the player (i.e. Esau & Tainted Soul). Default is
 *                                 false.
 */
export function getPlayers(performCharacterExclusions = false): EntityPlayer[] {
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
 * Some players are "child" players, meaning that they have a non-undefined Parent property. (For
 * example, the Strawman Keeper.)
 */
export function isChildPlayer(player: EntityPlayer): boolean {
  return player.Parent !== undefined;
}
