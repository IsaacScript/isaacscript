import {
  CHARACTERS_WITH_NO_RED_HEARTS,
  CHARACTERS_WITH_NO_SOUL_HEARTS,
  LOST_STYLE_PLAYER_TYPES,
} from "../constants";
import { HealthType } from "../types/HealthType";
import { getKBitOfN, getNumBitsOfN } from "./bitwise";
import { getCollectibleMaxCharges } from "./collectibles";
import { getCollectibleSet } from "./collectibleSet";
import { ensureAllCases } from "./util";

const EXCLUDED_CHARACTERS = new Set<PlayerType>([
  PlayerType.PLAYER_ESAU, // 20
  PlayerType.PLAYER_THESOUL_B, // 40
]);

/**
 * PlayerIndex is a specific type of string; see the documentation for the [[`getPlayerIndex`]]
 * function. Mods can signify that data structures handle EntityPlayers by using this type:
 *
 * ```
 * const myPlayerMap = new Map<PlayerIndex, string>();
 * ```
 *
 * This type is branded for extra type safety.
 */
export type PlayerIndex = int & { __playerIndexBrand: unknown };

export function addCollectibleCostume(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
): void {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return;
  }

  player.AddCostume(itemConfigItem, false);
}

export function addTrinketCostume(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): void {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
  if (itemConfigTrinket === undefined) {
    return;
  }

  player.AddCostume(itemConfigTrinket, false);
}

/** Iterates over all players and checks if any player is close enough to the specified position. */
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

export function anyPlayerHasCollectible(
  collectibleType: CollectibleType | int,
): boolean {
  for (const player of getPlayers()) {
    if (player.HasCollectible(collectibleType)) {
      return true;
    }
  }

  return false;
}

export function anyPlayerHasTrinket(trinketType: TrinketType | int): boolean {
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
 * Helper function to determine if the provided character can have red heart containers. Returns
 * true for characters like Isaac, Magdalene, or Cain. Returns true for Keeper and Tainted Keeper,
 * even though coin containers are not technically the same as red heart containers. Returns false
 * for characters like Blue Baby. Returns false for The Lost and Tainted Lost.
 */
export function characterCanHaveRedHearts(character: PlayerType): boolean {
  return !CHARACTERS_WITH_NO_RED_HEARTS.has(character);
}

/**
 * Helper function to determine if the provided character can have soul hearts. Returns true for
 * characters like Isaac, Magdalene, or Cain. Returns false for characters like Bethany. Returns
 * false for The Lost and Tainted Lost.
 */
export function characterCanHaveSoulHearts(character: PlayerType): boolean {
  return !CHARACTERS_WITH_NO_SOUL_HEARTS.has(character);
}

/**
 * Helper function to get how long Azazel's Brimstone laser should be. You can pass either an
 * `EntityPlayer` object or a tear height stat.
 *
 * The formula for calculating it is: 32 - 2.5 * player.TearHeight
 */
export function getAzazelBrimstoneDistance(
  playerOrTearHeight: EntityPlayer | float,
) {
  let tearHeight = tonumber(playerOrTearHeight);
  if (tearHeight === undefined) {
    const player = playerOrTearHeight as EntityPlayer;
    tearHeight = player.TearHeight;
  }

  return 32 - 2.5 * tearHeight;
}

export function getClosestPlayer(position: Vector): EntityPlayer {
  let closestPlayer: EntityPlayer | null = null;
  let closestDistance = math.huge;
  for (const player of getPlayers()) {
    const distance = position.Distance(player.Position);

    if (distance < closestDistance) {
      closestPlayer = player;
      closestDistance = distance;
    }
  }

  if (closestPlayer === null) {
    error("Failed to find the closest player.");
  }

  return closestPlayer;
}

/**
 * Most characters have a 56 frame death animation (i.e. the "Death" animation).
 * The Lost and Tainted Lost have a 38 frame death animation (i.e. the "LostDeath" animation).
 * Tainted Forgotten have a 20 frame death animation (i.e. the "ForgottenDeath" animation).
 */
export function getDeathAnimationName(player: EntityPlayer): string {
  const character = player.GetPlayerType();

  if (LOST_STYLE_PLAYER_TYPES.has(character)) {
    return "LostDeath";
  }

  if (character === PlayerType.PLAYER_THEFORGOTTEN_B) {
    return "ForgottenDeath";
  }

  return "Death";
}

/**
 * Helper function that returns the type of the rightmost heart, not including golden hearts since
 * they can't be damaged directly.
 */
export function getLastHeart(player: EntityPlayer): HealthType {
  const hearts = player.GetHearts();
  const effectiveMaxHearts = player.GetEffectiveMaxHearts();
  const soulHearts = player.GetSoulHearts();
  const blackHearts = player.GetBlackHearts();
  const eternalHearts = player.GetEternalHearts();
  const boneHearts = player.GetBoneHearts();
  const rottenHearts = player.GetRottenHearts();

  const soulHeartSlots = soulHearts / 2;
  const lastHeartIndex = boneHearts + soulHeartSlots - 1;
  const isLastHeartBone = player.IsBoneHeart(lastHeartIndex);

  if (isLastHeartBone) {
    const isLastContainerEmpty = hearts <= effectiveMaxHearts - 2;
    if (isLastContainerEmpty) {
      return HealthType.BONE;
    }

    if (rottenHearts > 0) {
      return HealthType.ROTTEN;
    }

    if (eternalHearts > 0) {
      return HealthType.ETERNAL;
    }

    return HealthType.RED;
  }

  if (soulHearts > 0) {
    const numBits = getNumBitsOfN(blackHearts);
    const finalBit = getKBitOfN(numBits - 1, blackHearts);
    const isBlack = finalBit === 1;

    if (isBlack) {
      return HealthType.BLACK;
    }

    // If it is not a black heart, it must be a soul heart
    return HealthType.SOUL;
  }

  if (eternalHearts > 0) {
    return HealthType.ETERNAL;
  }

  if (rottenHearts > 0) {
    return HealthType.ROTTEN;
  }

  return HealthType.RED;
}

/**
 * Helper function to get the first player with the lowest frame count. Useful to find a freshly
 * spawned player after using items like Esau Jr. Don't use this function if two or more players
 * will be spawned on the same frame.
 */
export function getNewestPlayer(): EntityPlayer {
  let newestPlayer: EntityPlayer | null = null;
  let lowestFrame = math.huge;
  for (const player of getPlayers()) {
    if (player.FrameCount < lowestFrame) {
      newestPlayer = player;
      lowestFrame = player.FrameCount;
    }
  }

  if (newestPlayer === null) {
    error("Failed to find the newest player.");
  }

  return newestPlayer;
}

export function getFinalPlayer(): EntityPlayer {
  const players = getPlayers();

  return players[players.length - 1];
}

/**
 * Iterates over all players and checks if any are close enough to the specified position.
 *
 * @returns The first player found when iterating upwards from index 0.
 */
export function getPlayerCloserThan(
  position: Vector,
  distance: float,
): EntityPlayer | undefined {
  for (const player of getPlayers()) {
    if (player.Position.Distance(position) <= distance) {
      return player;
    }
  }

  return undefined;
}

/**
 * Iterates over every item in the game and returns a map containing the number of each item that
 * the player has.
 */
export function getPlayerCollectibleMap(
  player: EntityPlayer,
): Map<CollectibleType | int, int> {
  const collectibleSet = getCollectibleSet();
  const collectibleMap = new Map<CollectibleType | int, int>();
  for (const collectibleType of collectibleSet.values()) {
    const collectibleNum = player.GetCollectibleNum(collectibleType, true);
    if (collectibleNum > 0) {
      collectibleMap.set(collectibleType, collectibleNum);
    }
  }

  return collectibleMap;
}

export function getPlayerFromIndex(
  playerIndex: PlayerIndex,
): EntityPlayer | undefined {
  for (const player of getPlayers()) {
    const existingPlayerIndex = getPlayerIndex(player);
    if (existingPlayerIndex === playerIndex) {
      return player;
    }
  }

  return undefined;
}

/**
 * This function always excludes players with a non-undefined parent, since they are not real
 * players. (e.g. the Strawman Keeper)
 *
 * @param performExclusions Whether or not to exclude characters that are not directly controlled by
 * the player (i.e. Esau & Tainted Soul). False by default.
 */
export function getPlayers(performExclusions = false): EntityPlayer[] {
  const game = Game();

  const players: EntityPlayer[] = [];
  for (let i = 0; i < game.GetNumPlayers(); i++) {
    const player = Isaac.GetPlayer(i);
    if (player === undefined) {
      continue;
    }

    if (isChildPlayer(player)) {
      continue;
    }

    // BWe might only want to make a list of players that are fully-functioning and controlled by
    // humans
    // Thus, we need to exclude certain characters
    const character = player.GetPlayerType();
    if (performExclusions && EXCLUDED_CHARACTERS.has(character)) {
      continue;
    }

    players.push(player);
  }

  return players;
}

export function getPlayersOfType(playerType: PlayerType): EntityPlayer[] {
  const players: EntityPlayer[] = [];
  for (const player of getPlayers()) {
    const character = player.GetPlayerType();
    if (character === playerType) {
      players.push(player);
    }
  }

  return players;
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
 *
 * Instead, we use `EntityPlayer.GetCollectibleRNG()` with an arbitrary value of 1 (i.e. Sad Onion).
 * This works even if the player does not have any Sad Onions.
 *
 * Finally, this index fails in the case of Tainted Lazarus, since the RNG will be the same for both
 * Tainted Lazarus and Dead Tainted Lazarus. We revert to using the RNG of Inner Eye for this case.
 */
export function getPlayerIndex(player: EntityPlayer): PlayerIndex {
  const character = player.GetPlayerType();
  const collectibleToUse =
    character === PlayerType.PLAYER_LAZARUS2_B
      ? CollectibleType.COLLECTIBLE_INNER_EYE
      : CollectibleType.COLLECTIBLE_SAD_ONION;
  const collectibleRNG = player.GetCollectibleRNG(collectibleToUse);
  const seed = collectibleRNG.GetSeed();

  return seed as PlayerIndex;
}

/**
 * Helper function to return the index of this player with respect to the output of the
 * `Isaac.GetPlayer()` function.
 */
export function getPlayerIndexVanilla(
  playerToFind: EntityPlayer,
): int | undefined {
  const game = Game();

  const playerToFindHash = GetPtrHash(playerToFind);

  for (let i = 0; i < game.GetNumPlayers(); i++) {
    const player = Isaac.GetPlayer(i);
    if (player === undefined) {
      continue;
    }

    const playerHash = GetPtrHash(player);
    if (playerHash === playerToFindHash) {
      return i;
    }
  }

  return undefined;
}

/**
 * Returns the combined value of all of the player's red hearts, soul/black hearts, and bone hearts.
 * This is equivalent to the number of hits that the player can currently take.
 */
export function getPlayerNumAllHearts(player: EntityPlayer): int {
  const hearts = player.GetHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  const eternalHearts = player.GetEternalHearts();

  return hearts + soulHearts + boneHearts + eternalHearts;
}

/**
 * Helper function to return the active charge and the battery charge combined. This is useful
 * because you are not able to set the battery charge directly.
 */
export function getTotalCharge(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
): int {
  const activeCharge = player.GetActiveCharge(activeSlot);
  const batteryCharge = player.GetBatteryCharge(activeSlot);

  return activeCharge + batteryCharge;
}

/**
 * Returns the total number of collectibles amongst all players. For example, if player 1 has 1 Sad
 * Onion and player 2 has 2 Sad Onions, then this function would return 3.
 */
export function getTotalPlayerCollectibles(
  collectibleType: CollectibleType | int,
): int {
  let numCollectibles = 0;
  for (const player of getPlayers()) {
    numCollectibles += player.GetCollectibleNum(collectibleType);
  }

  return numCollectibles;
}

/** After touching a white fire, a player will turn into The Lost until they clear a room. */
export function hasLostCurse(player: EntityPlayer): boolean {
  const effects = player.GetEffects();
  return effects.HasNullEffect(NullItemID.ID_LOST_CURSE);
}

/**
 * Returns whether or not the player can hold an additional active item, beyond what they are
 * currently carrying. This takes the Schoolbag into account.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenActiveItemSlot(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THESOUL_B) {
    return false;
  }

  const activeItemPrimary = player.GetActiveItem(ActiveSlot.SLOT_PRIMARY);
  const activeItemSecondary = player.GetActiveItem(ActiveSlot.SLOT_SECONDARY);
  const hasSchoolbag = player.HasCollectible(
    CollectibleType.COLLECTIBLE_SCHOOLBAG,
  );

  if (hasSchoolbag) {
    return (
      activeItemPrimary === CollectibleType.COLLECTIBLE_NULL ||
      activeItemSecondary === CollectibleType.COLLECTIBLE_NULL
    );
  }

  return activeItemPrimary === CollectibleType.COLLECTIBLE_NULL;
}

/**
 * Helper function for detecting when a player is Bethany or Tainted Bethany. This is useful if you
 * need to adjust UI elements to account for Bethany's soul charges or Tainted Bethany's blood
 * charges.
 */
export function isBethany(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_BETHANY ||
    character === PlayerType.PLAYER_BETHANY_B
  );
}

/**
 * Some players are "child" players, meaning that they have a non-undefined Parent property.
 * (For example, the Strawman Keeper.)
 */
export function isChildPlayer(player: EntityPlayer): boolean {
  return player.Parent !== undefined;
}

export function isFirstPlayer(player: EntityPlayer): boolean {
  return getPlayerIndexVanilla(player) === 0;
}

/**
 * Helper function for detecting when a player is Jacob or Esau. This will only match the
 * non-tainted versions of these characters.
 */
export function isJacobOrEsau(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_JACOB ||
    character === PlayerType.PLAYER_ESAU
  );
}

/**
 * Helper function for detecting when a player is Keeper or Tainted Keeper. Useful for situations
 * where you want to know if the health is coin hearts, for example.
 */
export function isKeeper(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_KEEPER ||
    character === PlayerType.PLAYER_KEEPER_B
  );
}

/** Helper function for detecting when a player is The Lost or Tainted Lost. */
export function isLost(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_THELOST ||
    character === PlayerType.PLAYER_THELOST_B
  );
}

/** Helper function for detecting when a player is Tainted Lazarus or Dead Tainted Lazarus. */
export function isTaintedLazarus(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_LAZARUS_B ||
    character === PlayerType.PLAYER_LAZARUS2_B
  );
}

export function removeCollectibleCostume(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
): void {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return;
  }

  player.RemoveCostume(itemConfigItem);
}

/**
 * Helper function to remove the Dead Eye multiplier from a player.
 *
 * Note that each time the `EntityPlayer.ClearDeadEyeCharge()` function is called, it only has a
 * chance of working, so this function calls it 100 times to be safe.
 */
export function removeDeadEyeMultiplier(player: EntityPlayer): void {
  for (let i = 0; i < 100; i++) {
    player.ClearDeadEyeCharge();
  }
}

export function removeTrinketCostume(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): void {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
  if (itemConfigTrinket === undefined) {
    return;
  }

  player.RemoveCostume(itemConfigTrinket);
}

/**
 * Helper function to set an active collectible to a particular slot. This has different behavior
 * than calling `player.AddCollectible()` with the `activeSlot` argument, because this function will
 * not shift existing items into the Schoolbag and it handles `ActiveSlot.SLOT_POCKET2`.
 *
 * Note that if an item is set to `ActiveSlot.SLOT_POCKET2`, it will disappear after being used and
 * will be automatically removed upon entering a new room.
 *
 * @param player The player to give the item to.
 * @param collectibleType The collectible type of the item to give.
 * @param activeSlot The slot to set.
 * @param charge Optional. The argument of charges to set. If not specified, the item will be set
 * with maximum charges.
 * @param keepInPools Optional. Whether or not to remove the item from pools. False by default.
 */
export function setActiveItem(
  player: EntityPlayer,
  collectibleType: CollectibleType,
  activeSlot: ActiveSlot,
  charge?: int,
  keepInPools = false,
): void {
  const game = Game();
  const itemPool = game.GetItemPool();
  const primaryCollectibleType = player.GetActiveItem(ActiveSlot.SLOT_PRIMARY);
  const primaryCharge = player.GetActiveCharge(ActiveSlot.SLOT_PRIMARY);
  const secondaryCollectibleType = player.GetActiveItem(
    ActiveSlot.SLOT_SECONDARY,
  );

  if (charge === undefined) {
    charge = getCollectibleMaxCharges(collectibleType);
  }

  if (!keepInPools) {
    itemPool.RemoveCollectible(collectibleType);
  }

  switch (activeSlot) {
    case ActiveSlot.SLOT_PRIMARY: {
      // If there is a Schoolbag item, removing the primary item will shift the Schoolbag item to
      // the primary slot
      if (primaryCollectibleType !== CollectibleType.COLLECTIBLE_NULL) {
        player.RemoveCollectible(primaryCollectibleType);
      }

      // If there was a Schoolbag item, adding a new primary item will shift it back into the
      // secondary slot
      player.AddCollectible(collectibleType, charge, false);

      break;
    }

    case ActiveSlot.SLOT_SECONDARY: {
      if (primaryCollectibleType !== CollectibleType.COLLECTIBLE_NULL) {
        player.RemoveCollectible(primaryCollectibleType);
      }

      if (secondaryCollectibleType !== CollectibleType.COLLECTIBLE_NULL) {
        player.RemoveCollectible(secondaryCollectibleType);
      }

      // Add the new item, which will go to the primary slot
      player.AddCollectible(secondaryCollectibleType, charge, false);

      // Add back the original primary item, if any
      if (primaryCollectibleType !== CollectibleType.COLLECTIBLE_NULL) {
        player.AddCollectible(primaryCollectibleType, primaryCharge, false);
      }

      break;
    }

    case ActiveSlot.SLOT_POCKET: {
      player.SetPocketActiveItem(collectibleType, activeSlot, keepInPools);
      player.SetActiveCharge(charge, activeSlot);

      break;
    }

    case ActiveSlot.SLOT_POCKET2: {
      player.SetPocketActiveItem(collectibleType, activeSlot, keepInPools);
      break;
    }

    default: {
      ensureAllCases(activeSlot);
    }
  }
}

/**
 * If you want to stop the player from shooting without the blindfold costume, then simply call
 * `player.TryRemoveNullCostume(NullItemID.ID_BLINDFOLD)` after invoking this function.
 *
 * This function was originally created by im_tem.
 */
export function setBlindfold(player: EntityPlayer, enabled: boolean): void {
  const game = Game();
  const character = player.GetPlayerType();
  const challenge = Isaac.GetChallenge();

  if (enabled) {
    game.Challenge = Challenge.CHALLENGE_SOLAR_SYSTEM; // This challenge has a blindfold
    player.ChangePlayerType(character);
    game.Challenge = challenge;
  } else {
    game.Challenge = Challenge.CHALLENGE_NULL;
    player.ChangePlayerType(character);
    game.Challenge = challenge;
    player.TryRemoveNullCostume(NullItemID.ID_BLINDFOLD);
  }
}
