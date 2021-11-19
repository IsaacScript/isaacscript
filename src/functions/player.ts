import { HealthType } from "../types/HealthType";
import { PocketItemDescription } from "../types/PocketItemDescription";
import { PocketItemType } from "../types/PocketItemType";
import { getKBitOfN, getNumBitsOfN } from "./bitwise";
import { getCollectibleSet } from "./collectibles";

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
  collectibleType: CollectibleType,
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
  trinketType: TrinketType,
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
 * The Lost and Tainted Lost use a 38 frame death animation (i.e. the "LostDeath" animation).
 */
export function getDeathAnimationName(player: EntityPlayer): string {
  const character = player.GetPlayerType();
  const isLostTypeCharacter =
    character === PlayerType.PLAYER_THELOST ||
    character === PlayerType.PLAYER_THELOST_B ||
    character === PlayerType.PLAYER_THESOUL ||
    character === PlayerType.PLAYER_THESOUL_B;

  return isLostTypeCharacter ? "LostDeath" : "Death";
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
 * Returns the slot number corresponding to where a trinket can be safely inserted.
 *
 * Example:
 * ```
 * const player = Isaac.GetPlayer();
 * const trinketSlot = getOpenTrinketSlotNum(player);
 * if (trinketSlot !== undefined) {
 *   // They have one or more open trinket slots
 *   player.AddTrinket(TrinketType.TRINKET_SWALLOWED_PENNY);
 * }
 * ```
 */
export function getOpenTrinketSlot(player: EntityPlayer): int | undefined {
  const maxTrinkets = player.GetMaxTrinkets();
  const trinket0 = player.GetTrinket(0);
  const trinket1 = player.GetTrinket(1);

  if (maxTrinkets === 1) {
    return trinket0 === TrinketType.TRINKET_NULL ? 0 : undefined;
  }

  if (maxTrinkets === 2) {
    if (trinket0 === TrinketType.TRINKET_NULL) {
      return 0;
    }

    return trinket1 === TrinketType.TRINKET_NULL ? 1 : undefined;
  }

  error(`The player has an unknown number of trinket slots: ${maxTrinkets}`);
  return undefined;
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
 * Use this helper function as a workaround for `EntityPlayer.GetPocketItem()` not working
 * correctly.
 *
 * Note that due to API limitations, there is no way to determine the location of a Dice Bag trinket
 * dice. Furthermore, when the player has a Dice Bag trinket dice and a pocket active at the same
 * time, there is no way to determine the location of the pocket active item. If this function
 * cannot determine the identity of a particular slot, it will mark the type of the slot as
 * `PocketItemType.UNDETERMINABLE`.
 */
export function getPocketItems(player: EntityPlayer): PocketItemDescription[] {
  const pocketItem = player.GetActiveItem(ActiveSlot.SLOT_POCKET);
  const hasPocketItem = pocketItem !== CollectibleType.COLLECTIBLE_NULL;

  const pocketItem2 = player.GetActiveItem(ActiveSlot.SLOT_POCKET2);
  const hasPocketItem2 = pocketItem2 !== CollectibleType.COLLECTIBLE_NULL;

  const maxPocketItems = player.GetMaxPocketItems();

  const pocketItems: PocketItemDescription[] = [];
  let pocketItemIdentified = false;
  let pocketItem2Identified = false;
  for (let slot = 0; slot < 4; slot++) {
    const card = player.GetCard(slot as PocketItemSlot);
    const pill = player.GetPill(slot as PocketItemSlot);

    if (card !== Card.CARD_NULL) {
      pocketItems.push({
        type: PocketItemType.CARD,
        id: card,
      });
    } else if (pill !== PillColor.PILL_NULL) {
      pocketItems.push({
        type: PocketItemType.PILL,
        id: pill,
      });
    } else if (hasPocketItem && !hasPocketItem2 && !pocketItemIdentified) {
      pocketItemIdentified = true;
      pocketItems.push({
        type: PocketItemType.ACTIVE_ITEM,
        id: pocketItem,
      });
    } else if (!hasPocketItem && hasPocketItem2 && !pocketItem2Identified) {
      pocketItem2Identified = true;
      pocketItems.push({
        type: PocketItemType.DICE_BAG_DICE,
        id: pocketItem2,
      });
    } else if (hasPocketItem && hasPocketItem2) {
      pocketItems.push({
        type: PocketItemType.UNDETERMINABLE,
        id: 0,
      });
    } else {
      pocketItems.push({
        type: PocketItemType.EMPTY,
        id: 0,
      });
    }

    if (slot + 1 === maxPocketItems) {
      break;
    }
  }

  return pocketItems;
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
  collectibleType: CollectibleType,
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
 * Returns whether or not the player can hold an additional pocket item, beyond what they are
 * currently carrying. This takes into account items that modify the max number of pocket items,
 * like Starter Deck.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenPocketItemSlot(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THESOUL_B) {
    return false;
  }

  const pocketItems = getPocketItems(player);
  for (const pocketItem of pocketItems) {
    if (pocketItem.type === PocketItemType.EMPTY) {
      return true;
    }
  }

  return false;
}

/**
 * Returns whether or not the player can hold an additional trinket, beyond what they are currently
 * carrying. This takes into account items that modify the max number of trinkets, like Mom's Purse.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenTrinketSlot(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THESOUL_B) {
    return false;
  }

  const openTrinketSlot = getOpenTrinketSlot(player);
  return openTrinketSlot !== undefined;
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

export function isLost(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_THELOST ||
    character === PlayerType.PLAYER_THELOST_B
  );
}

export function removeCollectibleCostume(
  player: EntityPlayer,
  collectibleType: CollectibleType,
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
  trinketType: TrinketType,
): void {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
  if (itemConfigTrinket === undefined) {
    return;
  }

  player.RemoveCostume(itemConfigTrinket);
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
