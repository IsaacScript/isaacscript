import {
  ActiveSlot,
  CacheFlag,
  Challenge,
  CollectibleType,
  NullItemID,
  PlayerForm,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game, itemConfig } from "../cachedClasses";
import { HealthType } from "../enums/HealthType";
import { getLastElement, sumArray } from "./array";
import { countSetBits, getKBitOfN, getNumBitsOfN } from "./bitwise";
import {
  getCharacterMaxHeartContainers,
  getCharacterName,
  isVanillaCharacter,
} from "./character";
import { getCollectibleMaxCharges } from "./collectibles";
import { getCollectibleSet } from "./collectibleSet";
import { getEnumValues } from "./enums";
import { getPlayerIndexVanilla, getPlayers } from "./playerIndex";
import { addTearsStat } from "./tears";
import { ensureAllCases, repeat } from "./utils";

const STAT_CACHE_FLAGS_SET: ReadonlySet<CacheFlag> = new Set([
  CacheFlag.DAMAGE, // 1 << 0
  CacheFlag.FIRE_DELAY, // 1 << 1
  CacheFlag.SHOT_SPEED, // 1 << 2
  CacheFlag.RANGE, // 1 << 3
  CacheFlag.SPEED, // 1 << 4
  CacheFlag.LUCK, // 1 << 10
]);

export function addCollectibleCostume(
  player: EntityPlayer,
  collectibleType: CollectibleType,
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
 * Note that for `CacheFlag.FIRE_DELAY`, the "amount" argument will be interpreted as the tear stat
 * to add (and not the amount to mutate `EntityPlayer.MaxFireDelay` by).
 *
 * This function supports the following cache flags:
 * - CacheFlag.DAMAGE (1 << 0)
 * - CacheFlag.FIRE_DELAY (1 << 1)
 * - CacheFlag.SHOT_SPEED (1 << 2)
 * - CacheFlag.RANGE (1 << 3)
 * - CacheFlag.SPEED (1 << 4)
 * - CacheFlag.LUCK (1 << 10)
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
    case CacheFlag.DAMAGE: {
      player.Damage += amount;
      break;
    }

    // 1 << 1
    case CacheFlag.FIRE_DELAY: {
      addTearsStat(player, amount);
      break;
    }

    // 1 << 2
    case CacheFlag.SHOT_SPEED: {
      player.ShotSpeed += amount;
      break;
    }

    // 1 << 3
    case CacheFlag.RANGE: {
      player.TearHeight += amount;
      break;
    }

    // 1 << 4
    case CacheFlag.SPEED: {
      player.MoveSpeed += amount;
      break;
    }

    // 1 << 10
    case CacheFlag.LUCK: {
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
  trinketType: TrinketType,
): void {
  const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
  if (itemConfigTrinket === undefined) {
    return;
  }

  player.AddCostume(itemConfigTrinket, false);
}

export function anyPlayerHasCollectible(
  collectibleType: CollectibleType,
): boolean {
  const players = getPlayers();
  return players.some((player) => player.HasCollectible(collectibleType));
}

export function anyPlayerHasTrinket(trinketType: TrinketType): boolean {
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
 * Helper function to determine if a player will destroy a rock/pot/skull if they walk over it.
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
    player.HasCollectible(CollectibleType.LEO) ||
    player.HasCollectible(CollectibleType.THUNDER_THIGHS) ||
    effects.HasCollectibleEffect(CollectibleType.MEGA_MUSH) ||
    player.HasPlayerForm(PlayerForm.STOMPY)
  );
}

/**
 * Helper function to find the active slot that the player has the corresponding collectible type
 * in. Returns undefined if the player does not have the collectible in any active slot.
 */
export function getActiveItemSlot(
  player: EntityPlayer,
  collectibleType: CollectibleType,
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

  const lastPlayer = getLastElement(players);
  if (lastPlayer === undefined) {
    error("Failed to get the final player since there were 0 players.");
  }

  return lastPlayer;
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
 * Helper function to return the total amount of collectibles that a player has that match the
 * collectible type(s) provided.
 *
 * This function is variadic, meaning that you can specify N collectible types.
 */
export function getPlayerCollectibleCount(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
): int {
  let numCollectibles = 0;
  for (const collectibleType of collectibleTypes) {
    numCollectibles += player.GetCollectibleNum(collectibleType, true);
  }

  return numCollectibles;
}

/**
 * Iterates over every item in the game and returns a map containing the number of each item that
 * the player has.
 */
export function getPlayerCollectibleMap(
  player: EntityPlayer,
): Map<CollectibleType, int> {
  const collectibleSet = getCollectibleSet();
  const collectibleMap = new Map<CollectibleType, int>();
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

    // If it is not a black heart, it must be a soul heart.
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
  // Magdalene can increase her maximum heart containers with Birthright.
  if (
    character === PlayerType.MAGDALENE &&
    player.HasCollectible(CollectibleType.BIRTHRIGHT)
  ) {
    const extraMaxHeartContainersFromBirthright = 6;
    return characterMaxHeartContainers + extraMaxHeartContainersFromBirthright;
  }

  // 14, 33
  // Keeper and Tainted Keeper can increase their coin containers with Mother's Kiss and Greed's
  // Gullet.
  if (isKeeper(player)) {
    const numMothersKisses = player.GetTrinketMultiplier(
      TrinketType.MOTHERS_KISS,
    );
    const hasGreedsGullet = player.HasCollectible(
      CollectibleType.GREEDS_GULLET,
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

  // Account for modded characters.
  return isModdedPlayer(player)
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
export function getPlayersOfType(...characters: PlayerType[]): EntityPlayer[] {
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
  ...collectibleTypes: CollectibleType[]
): EntityPlayer[] {
  const players = getPlayers();
  return players.filter((player) =>
    collectibleTypes.every((collectibleType) =>
      player.HasCollectible(collectibleType),
    ),
  );
}

/**
 * Helper function to get only the players that have a certain trinket.
 *
 * This function is variadic, meaning that you can supply as many trinket types as you want to check
 * for. It only returns the players that have all of the trinkets.
 */
export function getPlayersWithTrinket(
  ...trinketTypes: TrinketType[]
): EntityPlayer[] {
  const players = getPlayers();
  return players.filter((player) =>
    trinketTypes.every((trinketType) => player.HasTrinket(trinketType)),
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
  const hasBirthright = player.HasCollectible(CollectibleType.BIRTHRIGHT);
  const maxNonTemporaryMaxHearts = hasBirthright ? 6 : 4;

  return Math.min(maxHearts, maxNonTemporaryMaxHearts);
}

/**
 * Returns the total number of collectibles amongst all players. For example, if player 1 has 1 Sad
 * Onion and player 2 has 2 Sad Onions, then this function would return 3.
 */
export function getTotalPlayerCollectibles(
  collectibleType: CollectibleType,
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
  return effects.HasNullEffect(NullItemID.LOST_CURSE);
}

/**
 * Returns whether or not the player can hold an additional active item, beyond what they are
 * currently carrying. This takes the Schoolbag into account.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenActiveItemSlot(player: EntityPlayer): boolean {
  if (isCharacter(player, PlayerType.THE_SOUL_B)) {
    return false;
  }

  const activeItemPrimary = player.GetActiveItem(ActiveSlot.PRIMARY);
  const activeItemSecondary = player.GetActiveItem(ActiveSlot.SECONDARY);
  const hasSchoolbag = player.HasCollectible(CollectibleType.SCHOOLBAG);

  if (hasSchoolbag) {
    return (
      activeItemPrimary === CollectibleType.NULL ||
      activeItemSecondary === CollectibleType.NULL
    );
  }

  return activeItemPrimary === CollectibleType.NULL;
}

export function isActiveSlotEmpty(
  player: EntityPlayer,
  activeSlot: ActiveSlot,
): boolean {
  const activeCollectibleType = player.GetActiveItem(activeSlot);
  return activeCollectibleType === CollectibleType.NULL;
}

/**
 * Helper function for detecting when a player is Bethany or Tainted Bethany. This is useful if you
 * need to adjust UI elements to account for Bethany's soul charges or Tainted Bethany's blood
 * charges.
 */
export function isBethany(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return character === PlayerType.BETHANY || character === PlayerType.BETHANY_B;
}

/**
 * Helper function to check if a player is a specific character (i.e. `PlayerType`).
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if the player is any of the supplied characters.
 */
export function isCharacter(
  player: EntityPlayer,
  ...characters: PlayerType[]
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

  return character === PlayerType.EDEN || character === PlayerType.EDEN_B;
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

  return character === PlayerType.JACOB || character === PlayerType.ESAU;
}

/**
 * Helper function for detecting when a player is Keeper or Tainted Keeper. Useful for situations
 * where you want to know if the health is coin hearts, for example.
 */
export function isKeeper(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return character === PlayerType.KEEPER || character === PlayerType.KEEPER_B;
}

/** Helper function for detecting when a player is The Lost or Tainted Lost. */
export function isLost(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.THE_LOST || character === PlayerType.THE_LOST_B
  );
}

export function isModdedPlayer(player: EntityPlayer): boolean {
  return !isVanillaPlayer(player);
}

/** Helper function for detecting if a player is one of the Tainted characters. */
export function isTainted(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return isVanillaPlayer(player)
    ? character >= PlayerType.ISAAC_B
    : isTaintedModded(player);
}

function isTaintedModded(player: EntityPlayer) {
  // This algorithm only works for modded characters because the `Isaac.GetPlayerTypeByName` method
  // is bugged.
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
    character === PlayerType.LAZARUS_B || character === PlayerType.LAZARUS_2_B
  );
}

export function isVanillaPlayer(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return isVanillaCharacter(character);
}

/**
 * Helper function to add one or more collectibles to a player.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * add.
 */
export function playerAddCollectible(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
): void {
  for (const collectibleType of collectibleTypes) {
    player.AddCollectible(collectibleType);
  }
}

/**
 * Helper function to check to see if a player has one or more collectibles.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * check for. Returns true if the player has any of the supplied collectible types.
 */
export function playerHasCollectible(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
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
  collectibleType: CollectibleType,
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
  trinketType: TrinketType,
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
 *               with maximum charges.
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
  const primaryCollectibleType = player.GetActiveItem(ActiveSlot.PRIMARY);
  const primaryCharge = player.GetActiveCharge(ActiveSlot.PRIMARY);
  const secondaryCollectibleType = player.GetActiveItem(ActiveSlot.SECONDARY);

  if (charge === undefined) {
    charge = getCollectibleMaxCharges(collectibleType);
  }

  if (!keepInPools) {
    itemPool.RemoveCollectible(collectibleType);
  }

  switch (activeSlot) {
    case ActiveSlot.PRIMARY: {
      // If there is a Schoolbag item, removing the primary item will shift the Schoolbag item to
      // the primary slot.
      if (primaryCollectibleType !== CollectibleType.NULL) {
        player.RemoveCollectible(primaryCollectibleType);
      }

      // If there was a Schoolbag item, adding a new primary item will shift it back into the
      // secondary slot.
      player.AddCollectible(collectibleType, charge, false);

      break;
    }

    case ActiveSlot.SECONDARY: {
      if (primaryCollectibleType !== CollectibleType.NULL) {
        player.RemoveCollectible(primaryCollectibleType);
      }

      if (secondaryCollectibleType !== CollectibleType.NULL) {
        player.RemoveCollectible(secondaryCollectibleType);
      }

      // Add the new item, which will go to the primary slot.
      player.AddCollectible(secondaryCollectibleType, charge, false);

      // Add back the original primary item, if any.
      if (primaryCollectibleType !== CollectibleType.NULL) {
        player.AddCollectible(primaryCollectibleType, primaryCharge, false);
      }

      break;
    }

    case ActiveSlot.POCKET: {
      player.SetPocketActiveItem(collectibleType, activeSlot, keepInPools);
      player.SetActiveCharge(charge, activeSlot);

      break;
    }

    case ActiveSlot.POCKET_SINGLE_USE: {
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
    game.Challenge = Challenge.SOLAR_SYSTEM; // This challenge has a blindfold
    player.ChangePlayerType(character);
    game.Challenge = challenge;

    // The costume is applied automatically.
    if (!modifyCostume) {
      player.TryRemoveNullCostume(NullItemID.BLINDFOLD);
    }
  } else {
    game.Challenge = Challenge.NULL;
    player.ChangePlayerType(character);
    game.Challenge = challenge;

    if (modifyCostume) {
      player.TryRemoveNullCostume(NullItemID.BLINDFOLD);
    }
  }
}

/**
 * Helper function to use an active item without showing an animation, keeping the item, or adding
 * any costumes.
 */
export function useActiveItemTemp(
  player: EntityPlayer,
  collectibleType: CollectibleType,
): void {
  player.UseActiveItem(collectibleType, false, false, true, false, -1);
}
