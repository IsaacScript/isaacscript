import { game, itemConfig } from "../cachedClasses";
import { MAX_VANILLA_CHARACTER } from "../constants";
import { HealthType } from "../enums/HealthType";
import { getLastElement, sumArray } from "./array";
import { countSetBits, getKBitOfN, getNumBitsOfN } from "./bitwise";
import { getCharacterMaxHeartContainers, getCharacterName } from "./character";
import { getCollectibleMaxCharges } from "./collectibles";
import { getCollectibleSet } from "./collectibleSet";
import { getPlayerIndexVanilla, getPlayers } from "./playerIndex";
import { addTearsStat } from "./tears";
import { ensureAllCases, getEnumValues, repeat } from "./utils";

const STAT_CACHE_FLAGS_SET: ReadonlySet<CacheFlag> = new Set([
  CacheFlag.CACHE_DAMAGE, // 1 << 0
  CacheFlag.CACHE_FIREDELAY, // 1 << 1
  CacheFlag.CACHE_SHOTSPEED, // 1 << 2
  CacheFlag.CACHE_RANGE, // 1 << 3
  CacheFlag.CACHE_SPEED, // 1 << 4
  CacheFlag.CACHE_LUCK, // 1 << 10
]);

export function addCollectibleCostume(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
): void {
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return;
  }

  player.AddCostume(itemConfigItem, false);
}

/**
 * Helper function to add a stat to a player based on the `CacheFlag` provided. Call this function
 * from the EvaluateCache callback.
 *
 * Note that for `CacheFlag.CACHE_FIREDELAY`, the "amount" argument will be interpreted as the tear
 * stat to add (and not the amount to mutate `EntityPlayer.MaxFireDelay` by).
 *
 * This function supports the following cache flags:
 * - CacheFlag.CACHE_DAMAGE (1 << 0)
 * - CacheFlag.CACHE_FIREDELAY (1 << 1)
 * - CacheFlag.CACHE_SHOTSPEED (1 << 2)
 * - CacheFlag.CACHE_RANGE (1 << 3)
 * - CacheFlag.CACHE_SPEED (1 << 4)
 * - CacheFlag.CACHE_LUCK (1 << 10)
 */
export function addStat(
  player: EntityPlayer,
  cacheFlag: CacheFlag,
  amount: number,
): void {
  if (!STAT_CACHE_FLAGS_SET.has(cacheFlag)) {
    error(
      `You cannot add a stat to a player with the cache flag of: ${cacheFlag}`,
    );
  }

  switch (cacheFlag) {
    // 1 << 0
    case CacheFlag.CACHE_DAMAGE: {
      player.Damage += amount;
      break;
    }

    // 1 << 1
    case CacheFlag.CACHE_FIREDELAY: {
      addTearsStat(player, amount);
      break;
    }

    // 1 << 2
    case CacheFlag.CACHE_SHOTSPEED: {
      player.ShotSpeed += amount;
      break;
    }

    // 1 << 3
    case CacheFlag.CACHE_RANGE: {
      player.TearHeight += amount;
      break;
    }

    // 1 << 4
    case CacheFlag.CACHE_SPEED: {
      player.MoveSpeed += amount;
      break;
    }

    // 1 << 10
    case CacheFlag.CACHE_LUCK: {
      player.Luck += amount;
      break;
    }

    default: {
      break;
    }
  }
}

export function addTrinketCostume(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): void {
  const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
  if (itemConfigTrinket === undefined) {
    return;
  }

  player.AddCostume(itemConfigTrinket, false);
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
export function anyPlayerIs(
  ...matchingCharacters: Array<PlayerType | int>
): boolean {
  const matchingCharacterSet = new Set(matchingCharacters);
  const characters = getCharacters();
  return characters.some((character) => matchingCharacterSet.has(character));
}

/**
 * Helper function to determine if a player will destroy a rock/pot/skull/etc. if they walk over it.
 *
 * The following situations allow for this to be true:
 * - the player has Leo (collectible 302)
 * - the player has Thunder Thighs (collectible 314)
 * - the player is under the effects of Mega Mush (collectible 625)
 * - the player has Stompy (transformation 13)
 */
export function canPlayerCrushRocks(player: EntityPlayer): boolean {
  const effects = player.GetEffects();

  return (
    player.HasCollectible(CollectibleType.COLLECTIBLE_LEO) ||
    player.HasCollectible(CollectibleType.COLLECTIBLE_THUNDER_THIGHS) ||
    effects.HasCollectibleEffect(CollectibleType.COLLECTIBLE_MEGA_MUSH) ||
    player.HasPlayerForm(PlayerForm.PLAYERFORM_STOMPY)
  );
}

/**
 * Helper function to find the active slot that the player has the corresponding collectible type
 * in. Returns undefined if the player does not have the collectible in any active slot.
 */
export function getActiveItemSlot(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
): ActiveSlot | undefined {
  const activeSlots = getEnumValues(ActiveSlot);
  return activeSlots.find((activeSlot) => {
    const activeItem = player.GetActiveItem(activeSlot);
    return activeItem === collectibleType;
  });
}

/**
 * Helper function to get how long Azazel's Brimstone laser should be. You can pass either an
 * `EntityPlayer` object or a tear height stat.
 *
 * The formula for calculating it is: 32 - 2.5 * player.TearHeight
 */
export function getAzazelBrimstoneDistance(
  playerOrTearHeight: EntityPlayer | float,
): float {
  let tearHeight = tonumber(playerOrTearHeight);
  if (tearHeight === undefined) {
    const player = playerOrTearHeight as EntityPlayer;
    tearHeight = player.TearHeight;
  }

  return 32 - 2.5 * tearHeight;
}

/** Helper function to get an array containing the characters of all of the current players. */
export function getCharacters(): PlayerType[] {
  const players = getPlayers();
  return players.map((player) => player.GetPlayerType());
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
 * Helper function to get an array of temporary effects for a player. This is helpful so that you
 * don't have to manually create an array from an `EffectsList` object.
 */
export function getEffectsList(player: EntityPlayer): TemporaryEffect[] {
  const effects = player.GetEffects();
  const effectsList = effects.GetEffectsList();

  const effectArray: TemporaryEffect[] = [];
  for (let i = 0; i < effectsList.Size; i++) {
    const effect = effectsList.Get(i);
    if (effect !== undefined) {
      effectArray.push(effect);
    }
  }

  return effectArray;
}

/**
 * Helper function to return the player with the highest ID, according to the `Isaac.GetPlayer`
 * method.
 */
export function getFinalPlayer(): EntityPlayer {
  const players = getPlayers();
  return getLastElement(players);
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
 * Returns the number of slots that the player has remaining for new heart containers, accounting
 * for broken hearts. For example, if the player is Judas and has 1 red heart containers and 2 full
 * soul hearts and 3 broken hearts, then this function would return 6 (i.e. 12 - 1 - 2 - 3).
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
 * Returns the number of black hearts that the player has, excluding any soul hearts. For example,
 * if the player has one full black heart, one full soul heart, and one half black heart, this
 * function returns 3.
 *
 * This is different from the `EntityPlayer.GetBlackHearts` method, since that returns a bitmask.
 */
export function getPlayerBlackHearts(player: EntityPlayer): int {
  const blackHeartsBitmask = player.GetBlackHearts();
  const blackHeartBits = countSetBits(blackHeartsBitmask);

  return blackHeartBits * 2;
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
  const players = getPlayers();
  return players.find(
    (player) => player.Position.Distance(position) <= distance,
  );
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

/**
 * Returns the number of red hearts that the player has, excluding any rotten hearts. For example,
 * if the player has one full black heart, one full soul heart, and one half black heart, this
 * function returns 3.
 *
 * This is different from the `EntityPlayer.GetHearts` method, since that returns a value that
 * includes rotten hearts.
 */
export function getPlayerHearts(player: EntityPlayer): int {
  const rottenHearts = player.GetRottenHearts();
  const hearts = player.GetHearts();

  return hearts - rottenHearts * 2;
}

/**
 * Helper function that returns the type of the rightmost heart. This does not including golden
 * hearts or broken hearts, since they cannot be damaged directly.
 */
export function getPlayerLastHeart(player: EntityPlayer): HealthType {
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
 * Returns the maximum heart containers that the provided player can have. Normally, this is 12, but
 * it can change depending on the character (e.g. Keeper) and other things (e.g. Mother's Kiss).
 * This function does not account for Broken Hearts; use the `getPlayerAvailableHeartSlots` helper
 * function for that.
 */
export function getPlayerMaxHeartContainers(player: EntityPlayer): int {
  const character = player.GetPlayerType();
  const characterMaxHeartContainers = getCharacterMaxHeartContainers(character);

  // 1
  // Magdalene can increase her maximum heart containers with Birthright
  if (
    character === PlayerType.PLAYER_MAGDALENE &&
    player.HasCollectible(CollectibleType.COLLECTIBLE_BIRTHRIGHT)
  ) {
    const extraMaxHeartContainersFromBirthright = 6;
    return characterMaxHeartContainers + extraMaxHeartContainersFromBirthright;
  }

  // 14, 33
  // Keeper and Tainted Keeper can increase their coin containers with Mother's Kiss and Greed's
  // Gullet
  if (isKeeper(player)) {
    const numMothersKisses = player.GetTrinketMultiplier(
      TrinketType.TRINKET_MOTHERS_KISS,
    );
    const hasGreedsGullet = player.HasCollectible(
      CollectibleType.COLLECTIBLE_GREEDS_GULLET,
    );
    const coins = player.GetNumCoins();
    const greedsGulletCoinContainers = hasGreedsGullet
      ? Math.floor(coins / 25)
      : 0;

    return (
      characterMaxHeartContainers +
      numMothersKisses +
      greedsGulletCoinContainers
    );
  }

  return characterMaxHeartContainers;
}

/**
 * Helper function to get the proper name of the player. Use this instead of the
 * `EntityPlayer.GetName` method because it accounts for Blue Baby, Lazarus II, and Tainted
 * characters.
 */
export function getPlayerName(player: EntityPlayer): string {
  const character = player.GetPlayerType();

  // Account for modded characters
  return character >= PlayerType.NUM_PLAYER_TYPES
    ? player.GetName()
    : getCharacterName(character);
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
 * Returns the number of soul hearts that the player has, excluding any black hearts. For example,
 * if the player has one full black heart, one full soul heart, and one half black heart, this
 * function returns 2.
 *
 * This is different from the `EntityPlayer.GetSoulHearts` method, since that returns the combined
 * number of soul hearts and black hearts.
 */
export function getPlayerSoulHearts(player: EntityPlayer): int {
  const soulHearts = player.GetSoulHearts();
  const blackHearts = getPlayerBlackHearts(player);

  return soulHearts - blackHearts;
}

/**
 * Helper function to get all of the players that are a certain character.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function getPlayersOfType(
  ...characters: Array<PlayerType | int>
): EntityPlayer[] {
  const charactersSet = new Set(characters);
  const players = getPlayers();
  return players.filter((player) => {
    const character = player.GetPlayerType();
    return charactersSet.has(character);
  });
}

/**
 * Helper function to get only the players that have a certain collectible.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * check for. It only returns the players that have all of the collectibles.
 */
export function getPlayersWithCollectible(
  ...collectibleTypes: Array<CollectibleType | int>
): EntityPlayer[] {
  const players = getPlayers();
  return players.filter((player) =>
    collectibleTypes.every((collectibleType) =>
      player.HasCollectible(collectibleType),
    ),
  );
}

/**
 * Helper function to determine how many heart containers that Tainted Magdalene has that will not
 * be automatically depleted over time. By default, this is 2, but this function will return 4 so
 * that it is consistent with the `player.GetHearts` and `player.GetMaxHearts` methods.
 *
 * If Tainted Magdalene has Birthright, she will gained an additional non-temporary heart container.
 *
 * This function does not validate whether or not the provided player is Tainted Magdalene; that
 * should be accomplished before invoking this function.
 */
export function getTaintedMagdaleneNonTemporaryMaxHearts(
  player: EntityPlayer,
): int {
  const maxHearts = player.GetMaxHearts();
  const hasBirthright = player.HasCollectible(
    CollectibleType.COLLECTIBLE_BIRTHRIGHT,
  );
  const maxNonTemporaryMaxHearts = hasBirthright ? 6 : 4;

  return Math.min(maxHearts, maxNonTemporaryMaxHearts);
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
  return sumArray(numCollectiblesArray);
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
  if (isCharacter(player, PlayerType.PLAYER_THESOUL_B)) {
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

export function isActiveSlotEmpty(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
): boolean {
  const activeCollectibleType = player.GetActiveItem(activeSlot);
  return activeCollectibleType === CollectibleType.COLLECTIBLE_NULL;
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
 * Helper function to check if a player is a specific character (i.e. `PlayerType`).
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if the player is any of the supplied characters.
 */
export function isCharacter(
  player: EntityPlayer,
  ...characters: Array<PlayerType | int>
): boolean {
  const characterSet = new Set(characters);
  const character = player.GetPlayerType();
  return characterSet.has(character);
}

/**
 * Helper function for detecting when a player is Eden or Tainted Eden. Useful for situations where
 * you want to know if the starting stats were randomized, for example.
 */
export function isEden(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.PLAYER_EDEN ||
    character === PlayerType.PLAYER_EDEN_B
  );
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

export function isModdedCharacter(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character > MAX_VANILLA_CHARACTER;
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

export function isVanillaCharacter(player: EntityPlayer): boolean {
  return !isModdedCharacter(player);
}

/**
 * Helper function to check to see if a player has one or more collectibles.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * check for. Returns true if the player has any of the supplied collectible types.
 */
export function playerHasCollectible(
  player: EntityPlayer,
  ...collectibleTypes: Array<CollectibleType | int>
): boolean {
  return collectibleTypes.some((collectibleType) =>
    player.HasCollectible(collectibleType),
  );
}

/**
 * Helper function to remove a collectible costume from a player. Use this helper function to avoid
 * having to request the collectible from the item config.
 */
export function removeCollectibleCostume(
  player: EntityPlayer,
  collectibleType: CollectibleType | int,
): void {
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return;
  }

  player.RemoveCostume(itemConfigItem);
}

/**
 * Helper function to remove the Dead Eye multiplier from a player.
 *
 * Note that each time the `EntityPlayer.ClearDeadEyeCharge` method is called, it only has a chance
 * of working, so this function calls it 100 times to be safe.
 */
export function removeDeadEyeMultiplier(player: EntityPlayer): void {
  repeat(100, () => {
    player.ClearDeadEyeCharge();
  });
}

/**
 * Helper function to remove a trinket costume from a player. Use this helper function to avoid
 * having to request the trinket from the item config.
 */
export function removeTrinketCostume(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): void {
  const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
  if (itemConfigTrinket === undefined) {
    return;
  }

  player.RemoveCostume(itemConfigTrinket);
}

/**
 * Helper function to set an active collectible to a particular slot. This has different behavior
 * than calling the `player.AddCollectible` method with the `activeSlot` argument, because this
 * function will not shift existing items into the Schoolbag and it handles
 * `ActiveSlot.SLOT_POCKET2`.
 *
 * Note that if an item is set to `ActiveSlot.SLOT_POCKET2`, it will disappear after being used and
 * will be automatically removed upon entering a new room.
 *
 * @param player The player to give the item to.
 * @param collectibleType The collectible type of the item to give.
 * @param activeSlot The slot to set.
 * @param charge Optional. The argument of charges to set. If not specified, the item will be set
 * with maximum charges.
 * @param keepInPools Optional. Whether or not to remove the item from pools. Default is false.
 */
export function setActiveItem(
  player: EntityPlayer,
  collectibleType: CollectibleType,
  activeSlot: ActiveSlot,
  charge?: int,
  keepInPools = false,
): void {
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
 * @param modifyCostume Optional. Whether to add or remove the blindfold costume. Default is true.
 */
export function setBlindfold(
  player: EntityPlayer,
  enabled: boolean,
  modifyCostume = true,
): void {
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
