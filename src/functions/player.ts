import {
  CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART,
  CHARACTERS_WITH_FREE_DEVIL_DEALS,
  CHARACTERS_WITH_NO_RED_HEARTS,
  CHARACTERS_WITH_NO_SOUL_HEARTS,
  LOST_STYLE_PLAYER_TYPES,
  MAX_PLAYER_HEART_CONTAINERS,
  MAX_VANILLA_CHARACTER,
} from "../constants";
import { HealthType } from "../types/HealthType";
import { arraySum } from "./array";
import { getKBitOfN, getNumBitsOfN } from "./bitwise";
import { getCollectibleMaxCharges } from "./collectibles";
import { getCollectibleSet } from "./collectibleSet";
import { ensureAllCases, stringContains, trimPrefix } from "./util";

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
  const players = getPlayers();
  return players.some(
    (player) => player.Position.Distance(position) <= distance,
  );
}

export function anyPlayerHasCollectible(
  collectibleType: CollectibleType | int,
): boolean {
  const players = getPlayers();
  return players.some((player) => player.HasCollectible(collectibleType));
}

export function anyPlayerHasTrinket(trinketType: TrinketType | int): boolean {
  const players = getPlayers();
  return players.some((player) => player.HasTrinket(trinketType));
}

/**
 * Helper function to determine if the given character is present.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function anyPlayerIs(...matchingCharacters: PlayerType[]): boolean {
  const matchingCharacterSet = new Set(matchingCharacters);
  const characters = getCharacters();
  return characters.some((character) => matchingCharacterSet.has(character));
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
 * Normally, characters get a red heart container upon reaching a new floor with an eternal heart,
 * but some characters grant a black heart instead. Returns true for Dark Judas and Tainted Judas.
 * Otherwise, returns false.
 */
export function characterGetsBlackHeartFromEternalHeart(
  character: PlayerType,
): boolean {
  return CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART.has(character);
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

export function getFinalPlayer(): EntityPlayer {
  const players = getPlayers();

  return players[players.length - 1];
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

/**
 * Returns the number of slots that the player has remaining for heart containers, accounting for
 * broken hearts. For example, if the player is Judas and has 1 red heart containers and 2 full soul
 * hearts and 3 broken hearts, then this function would return 6 (i.e. 12 - 1 - 2 - 3).
 */
export function getPlayerAvailableHeartSlots(player: EntityPlayer): int {
  const maxHeartContainers = getPlayerMaxHeartContainers(player);
  const effectiveMaxHearts = player.GetEffectiveMaxHearts();
  const normalAndBoneHeartContainers = effectiveMaxHearts / 2;
  const soulHearts = player.GetSoulHearts();
  const soulHeartContainers = math.ceil(soulHearts / 2);
  const totalHeartContainers =
    normalAndBoneHeartContainers + soulHeartContainers;
  const brokenHearts = player.GetBrokenHearts();
  const totalOccupiedHeartSlots = totalHeartContainers + brokenHearts;

  return maxHeartContainers - totalOccupiedHeartSlots;
}

/**
 * Returns the maximum heart containers that the provided character can have. Normally, this is 12,
 * but with Keeper it is 3, with Tainted Keeper it is 2. Does not account for Birthright or Mother's
 * Kiss; use the `getPlayerMaxHeartContainers()` function for that.
 */
export function getCharacterMaxHeartContainers(character: PlayerType): int {
  if (character === PlayerType.PLAYER_KEEPER) {
    return 3;
  }

  if (character === PlayerType.PLAYER_KEEPER_B) {
    return 2;
  }

  return 12;
}

/** Helper function to get an array containing the characters of all of the current players. */
export function getCharacters() {
  const players = getPlayers();
  return players.map((player) => player.GetPlayerType());
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
 * Returns the maximum heart containers that the provided player can have. Normally, this is 12, but
 * it can change depending on the character (e.g. Keeper) and other things (e.g. Mother's Kiss).
 * Does not account for Broken Hearts; use the `getPlayerAvailableHeartSlots()` function for that.
 */
export function getPlayerMaxHeartContainers(player: EntityPlayer): int {
  const character = player.GetPlayerType();
  let maxHeartContainers = getCharacterMaxHeartContainers(character);

  if (
    character === PlayerType.PLAYER_MAGDALENE &&
    player.HasCollectible(CollectibleType.COLLECTIBLE_BIRTHRIGHT)
  ) {
    maxHeartContainers += 6;
  }

  const numMothersKisses = player.GetTrinketMultiplier(
    TrinketType.TRINKET_MOTHERS_KISS,
  );
  maxHeartContainers += numMothersKisses;

  if (maxHeartContainers > MAX_PLAYER_HEART_CONTAINERS) {
    maxHeartContainers = MAX_PLAYER_HEART_CONTAINERS;
  }

  return maxHeartContainers;
}

/**
 * Helper function to get the proper name of the player. Use this instead of the
 * `EntityPlayer.GetName` method because it accounts for Blue Baby, Lazarus II, and Tainted
 * characters.
 */
export function getPlayerName(player: EntityPlayer): string {
  const adjustedName = getAdjustedPlayerName(player);

  if (!isTainted(player)) {
    return adjustedName;
  }

  const baseName = trimPrefix(adjustedName, "The ");
  return stringContains(baseName, "Tainted") ? baseName : `Tainted ${baseName}`;
}

function getAdjustedPlayerName(player: EntityPlayer) {
  const character = player.GetPlayerType();

  switch (character) {
    // 4, 25
    // "???" --> "Blue Baby"
    case PlayerType.PLAYER_BLUEBABY:
    case PlayerType.PLAYER_BLUEBABY_B: {
      return "Blue Baby";
    }

    // 11
    // "Lazarus" --> "Lazarus II"
    case PlayerType.PLAYER_LAZARUS2: {
      return "Lazarus II";
    }

    // 12
    // "Black Judas" --> "Dark Judas"
    case PlayerType.PLAYER_BLACKJUDAS: {
      return "Dark Judas";
    }

    // 19
    // "Jacob" --> "Jacob & Esau"
    case PlayerType.PLAYER_JACOB: {
      return "Jacob & Esau";
    }

    // 38
    // "Lazarus" --> "Dead Tainted Lazarus"
    case PlayerType.PLAYER_LAZARUS2_B: {
      return "Dead Tainted Lazarus";
    }

    // 39
    // "Jacob" --> "Dead Tainted Jacob"
    case PlayerType.PLAYER_JACOB2_B: {
      return "Dead Tainted Jacob";
    }

    default: {
      return player.GetName();
    }
  }
}

/**
 * Returns the combined value of all of the player's red hearts, soul/black hearts, and bone hearts,
 * minus the value of the player's rotten hearts.
 *
 * This is equivalent to the number of hits that the player can currently take, but does not take
 * into account double damage from champion enemies and/or being on later floors. (For example, on
 * Womb 1, players who have 1 soul heart remaining would die in 1 hit to anything, even though this
 * function would report that they have 2 hits remaining.)
 */
export function getPlayerNumHitsRemaining(player: EntityPlayer): int {
  const hearts = player.GetHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  const eternalHearts = player.GetEternalHearts();
  const rottenHearts = player.GetRottenHearts();

  return hearts + soulHearts + boneHearts + eternalHearts - rottenHearts;
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

/**
 * Helper function to get all of the players that are a certain character.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function getPlayersOfType(...characters: PlayerType[]): EntityPlayer[] {
  const charactersSet = new Set(characters);
  const players = getPlayers();
  return players.filter((player) => {
    const character = player.GetPlayerType();
    return charactersSet.has(character);
  });
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
  const players = getPlayers();
  const numCollectiblesArray = players.map((player) =>
    player.GetCollectibleNum(collectibleType),
  );
  return arraySum(numCollectiblesArray);
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

/** Uses the player's current health and character to determine if incoming damage will be fatal. */
export function isDamageToPlayerFatal(
  player: EntityPlayer,
  damageAmount: int,
  damageSource: EntityRef,
  lastDamageFrame: int | undefined,
) {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const character = player.GetPlayerType();
  const effects = player.GetEffects();
  const isBerserk = effects.HasCollectibleEffect(
    CollectibleType.COLLECTIBLE_BERSERK,
  );

  // If we are Tainted Jacob and the damage source is Dark Esau, this will not be fatal damage
  // (because we will transform into Tainted Jacob's lost form)
  if (
    character === PlayerType.PLAYER_JACOB_B &&
    damageSource.Type === EntityType.ENTITY_DARK_ESAU
  ) {
    return false;
  }

  // If we are berserk, no damage is fatal
  // (the death is deferred until the end of the berserk effect)
  if (isBerserk) {
    return false;
  }

  // If we are Tainted Jacob in the Lost Form, we may have plenty of health left,
  // but we will still die in one hit to anything
  if (character === PlayerType.PLAYER_JACOB2_B) {
    return true;
  }

  // If we are in the "Lost Curse" form from touching a white fire, all damage will be fatal
  if (hasLostCurse(player)) {
    return true;
  }

  const playerNumAllHearts = getPlayerNumHitsRemaining(player);
  if (damageAmount < playerNumAllHearts) {
    return false;
  }

  // This will not be fatal damage if the player has Heartbreak and two slots open for broken hearts
  const playerAvailableHeartSlots = getPlayerAvailableHeartSlots(player);
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_HEARTBREAK) &&
    playerAvailableHeartSlots >= 2
  ) {
    return false;
  }

  // This will not be fatal damage if we have Glass Cannon and this is the second time we are taking
  // damage on the same frame
  if (
    player.HasCollectible(CollectibleType.COLLECTIBLE_BROKEN_GLASS_CANNON) &&
    gameFrameCount === lastDamageFrame
  ) {
    return false;
  }

  // This will not be fatal damage if we have two different kinds of hearts
  // e.g. a bomb explosion deals 2 damage,
  // but if the player has one half soul heart and one half red heart,
  // the game will only remove the soul heart
  const hearts = player.GetHearts();
  const eternalHearts = player.GetEternalHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  if (
    (hearts > 0 && soulHearts > 0) ||
    (hearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && boneHearts > 0) ||
    (soulHearts > 0 && eternalHearts > 0) ||
    boneHearts >= 2 // Two bone hearts and nothing else should not result in a death
  ) {
    return false;
  }

  return true;
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

/**
 * Helper function for detecting when a player is one of the characters that can take free Devil
 * Deals. (e.g. The Lost, Tainted Lost, etc.)
 */
export function canTakeFreeDevilDeals(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return CHARACTERS_WITH_FREE_DEVIL_DEALS.has(character);
}

/** Helper function for detecting if a player is one of the Tainted characters. */
export function isTainted(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return isVanillaCharacter(player)
    ? character >= PlayerType.PLAYER_ISAAC_B
    : isTaintedModded(player);
}

function isTaintedModded(player: EntityPlayer) {
  // This algorithm only works for modded characters because the "Isaac.GetPlayerTypeByName" method
  // is bugged
  // https://github.com/Meowlala/RepentanceAPIIssueTracker/issues/117
  const character = player.GetPlayerType();
  const name = player.GetName();
  const taintedCharacter = Isaac.GetPlayerTypeByName(name, true);

  return character === taintedCharacter;
}

/** Helper function for detecting when a player is Tainted Lazarus or Dead Tainted Lazarus. */
export function isTaintedLazarus(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_LAZARUS_B ||
    character === PlayerType.PLAYER_LAZARUS2_B
  );
}

export function isModdedCharacter(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character > MAX_VANILLA_CHARACTER;
}

export function isVanillaCharacter(player: EntityPlayer): boolean {
  return !isModdedCharacter(player);
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
 * Helper function to blindfold the player by using a hack with the challenge variable.
 *
 * The method used in this function was discovered by im_tem.
 *
 * @param player The player to apply or remove the blindfold state from.
 * @param enabled Whether or not to apply or remove the blindfold.
 * @param modifyCostume Optional. Whether to add or remove the blindfold costume. True by default.
 */
export function setBlindfold(
  player: EntityPlayer,
  enabled: boolean,
  modifyCostume = true,
): void {
  const game = Game();
  const character = player.GetPlayerType();
  const challenge = Isaac.GetChallenge();

  if (enabled) {
    game.Challenge = Challenge.CHALLENGE_SOLAR_SYSTEM; // This challenge has a blindfold
    player.ChangePlayerType(character);
    game.Challenge = challenge;

    // The costume is applied automatically
    if (!modifyCostume) {
      player.TryRemoveNullCostume(NullItemID.ID_BLINDFOLD);
    }
  } else {
    game.Challenge = Challenge.CHALLENGE_NULL;
    player.ChangePlayerType(character);
    game.Challenge = challenge;

    if (modifyCostume) {
      player.TryRemoveNullCostume(NullItemID.ID_BLINDFOLD);
    }
  }
}

/**
 * Helper function to use an active item without showing an animation, keeping the item, or adding
 * any costumes.
 */
export function useActiveItemTemp(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
): void {
  player.UseActiveItem(collectibleType, false, false, true, false, -1);
}
