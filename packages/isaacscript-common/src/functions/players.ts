import {
  ActiveSlot,
  Challenge,
  CollectibleType,
  ControllerIndex,
  NullItemID,
  PlayerForm,
  PlayerType,
  TearFlag,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  ACTIVE_SLOT_VALUES,
  TRINKET_SLOT_VALUES,
} from "../arrays/cachedEnumValues";
import { game, itemConfig } from "../core/cachedClasses";
import { ReadonlySet } from "../types/ReadonlySet";
import { sumArray } from "./array";
import { getCharacterName, isVanillaCharacter } from "./characters";
import { getCollectibleMaxCharges } from "./collectibles";
import { hasFlag } from "./flag";
import {
  getAllPlayers,
  getPlayerIndexVanilla,
  getPlayers,
} from "./playerIndex";
import { isNumber } from "./types";
import { assertDefined, repeat } from "./utils";

/**
 * Helper function to add one or more collectibles to a player.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * add.
 */
export function addCollectible(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
): void {
  for (const collectibleType of collectibleTypes) {
    player.AddCollectible(collectibleType);
  }
}

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

/**
 * Helper function to check to see if any player has a particular collectible.
 *
 * @param collectibleType The collectible type to check for.
 * @param ignoreModifiers If set to true, only counts collectibles the player actually owns and
 *                        ignores effects granted by items like Zodiac, 3 Dollar Bill and Lemegeton.
 *                        Default is false.
 */
export function anyPlayerHasCollectible(
  collectibleType: CollectibleType,
  ignoreModifiers?: boolean,
): boolean {
  const players = getAllPlayers();

  return players.some((player) =>
    player.HasCollectible(collectibleType, ignoreModifiers),
  );
}

/** Helper function to check to see if any player has a temporary collectible effect. */
export function anyPlayerHasCollectibleEffect(
  collectibleType: CollectibleType,
): boolean {
  const players = getAllPlayers();

  return players.some((player) => {
    const effects = player.GetEffects();
    return effects.HasCollectibleEffect(collectibleType);
  });
}

/** Helper function to check to see if any player has a temporary null effect. */
export function anyPlayerHasNullEffect(nullItemID: NullItemID): boolean {
  const players = getAllPlayers();

  return players.some((player) => {
    const effects = player.GetEffects();
    return effects.HasNullEffect(nullItemID);
  });
}

/**
 * Helper function to check to see if any player has a particular trinket.
 *
 * @param trinketType The trinket type to check for.
 * @param ignoreModifiers If set to true, only counts trinkets the player actually holds and ignores
 *                        effects granted by other items. Default is false.
 */
export function anyPlayerHasTrinket(
  trinketType: TrinketType,
  ignoreModifiers?: boolean,
): boolean {
  const players = getAllPlayers();

  return players.some((player) =>
    player.HasTrinket(trinketType, ignoreModifiers),
  );
}

/** Helper function to check to see if any player has a temporary trinket effect. */
export function anyPlayerHasTrinketEffect(trinketType: TrinketType): boolean {
  const players = getAllPlayers();

  return players.some((player) => {
    const effects = player.GetEffects();
    return effects.HasTrinketEffect(trinketType);
  });
}

/**
 * Helper function to check to see if any player is holding up an item (from e.g. an active item
 * activation, a poop from IBS, etc.).
 */
export function anyPlayerHoldingItem(): boolean {
  const players = getAllPlayers();
  return players.some((player) => player.IsHoldingItem());
}

/**
 * Helper function to determine if the given character is present.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function anyPlayerIs(...matchingCharacters: PlayerType[]): boolean {
  const matchingCharacterSet = new ReadonlySet(matchingCharacters);
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
 * Helper function to remove a collectible or trinket that is currently queued to go into a player's
 * inventory (i.e. the item is being held over their head).
 *
 * If the player does not have an item currently queued, then this function will be a no-op.
 *
 * Returns whether an item was actually dequeued.
 */
export function dequeueItem(player: EntityPlayer): boolean {
  if (player.QueuedItem.Item === undefined) {
    return false;
  }

  // Doing `player.QueuedItem.Item = undefined` does not work for some reason.
  const queue = player.QueuedItem;
  queue.Item = undefined;
  player.QueuedItem = queue;

  return true;
}

/**
 * Helper function to find the active slots that the player has the corresponding collectible type
 * in. Returns an empty array if the player does not have the collectible in any active slot.
 */
export function getActiveItemSlots(
  player: EntityPlayer,
  collectibleType: CollectibleType,
): ActiveSlot[] {
  return ACTIVE_SLOT_VALUES.filter((activeSlot) => {
    const activeItem = player.GetActiveItem(activeSlot);
    return activeItem === collectibleType;
  });
}

/**
 * Helper function to get how long Azazel's Brimstone laser should be. You can pass either an
 * `EntityPlayer` object or a tear height stat.
 *
 * The formula for calculating it is: 32 - 2.5 * tearHeight
 */
export function getAzazelBrimstoneDistance(
  playerOrTearHeight: EntityPlayer | float,
): float {
  const tearHeight = isNumber(playerOrTearHeight)
    ? playerOrTearHeight
    : playerOrTearHeight.TearHeight;

  return 32 - 2.5 * tearHeight;
}

/** Helper function to get an array containing the characters of all of the current players. */
export function getCharacters(): PlayerType[] {
  const players = getPlayers();
  return players.map((player) => player.GetPlayerType());
}

/**
 * Helper function to get the closest player to a certain position. Note that this will never
 * include players with a non-undefined parent, since they are not real players (e.g. the Strawman
 * Keeper).
 */
export function getClosestPlayer(position: Vector): EntityPlayer {
  let closestPlayer: EntityPlayer | undefined;
  let closestDistance = math.huge;
  for (const player of getPlayers()) {
    const distance = position.Distance(player.Position);

    if (distance < closestDistance) {
      closestPlayer = player;
      closestDistance = distance;
    }
  }

  assertDefined(closestPlayer, "Failed to find the closest player.");

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

  const lastPlayer = players.at(-1);
  assertDefined(
    lastPlayer,
    "Failed to get the final player since there were 0 players.",
  );

  return lastPlayer;
}

/**
 * Helper function to get the first player with the lowest frame count. Useful to find a freshly
 * spawned player after using items like Esau Jr. Don't use this function if two or more players
 * will be spawned on the same frame.
 */
export function getNewestPlayer(): EntityPlayer {
  let newestPlayer: EntityPlayer | undefined;
  let lowestFrame = math.huge;
  for (const player of getPlayers()) {
    if (player.FrameCount < lowestFrame) {
      newestPlayer = player;
      lowestFrame = player.FrameCount;
    }
  }

  assertDefined(newestPlayer, "Failed to find the newest player.");

  return newestPlayer;
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
 *
 * Note that this will filter out non-real collectibles like Lilith's Incubus.
 */
export function getPlayerCollectibleCount(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
): int {
  let numCollectibles = 0;
  for (const collectibleType of collectibleTypes) {
    // We specify "true" as the second argument to filter out things like Lilith's Incubus.
    numCollectibles += player.GetCollectibleNum(collectibleType, true);
  }

  return numCollectibles;
}

/**
 * Helper function to get the player from a tear, laser, bomb, etc. Returns undefined if the entity
 * does not correspond to any particular player.
 *
 * This function works by looking at the `Parent` and the `SpawnerEntity` fields (in that order). As
 * a last resort, it will attempt to use the `Entity.ToPlayer` method on the entity itself.
 */
export function getPlayerFromEntity(entity: Entity): EntityPlayer | undefined {
  if (entity.Parent !== undefined) {
    const player = entity.Parent.ToPlayer();
    if (player !== undefined) {
      return player;
    }

    const familiar = entity.Parent.ToFamiliar();
    if (familiar !== undefined) {
      return familiar.Player;
    }
  }

  if (entity.SpawnerEntity !== undefined) {
    const player = entity.SpawnerEntity.ToPlayer();
    if (player !== undefined) {
      return player;
    }

    const familiar = entity.SpawnerEntity.ToFamiliar();
    if (familiar !== undefined) {
      return familiar.Player;
    }
  }

  return entity.ToPlayer();
}

/**
 * Helper function to get an `EntityPlayer` object from an `EntityPtr`. Returns undefined if the
 * entity has gone out of scope or if the associated entity is not a player.
 */
export function getPlayerFromPtr(
  entityPtr: EntityPtr,
): EntityPlayer | undefined {
  const entity = entityPtr.Ref;
  if (entity === undefined) {
    return undefined;
  }

  return entity.ToPlayer();
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
 * Helper function to get all of the players that are a certain character.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function getPlayersOfType(...characters: PlayerType[]): EntityPlayer[] {
  const charactersSet = new ReadonlySet(characters);
  const players = getPlayers();

  return players.filter((player) => {
    const character = player.GetPlayerType();
    return charactersSet.has(character);
  });
}

/**
 * Helper function to get all of the players that match the provided controller index. This function
 * returns an array of players because it is possible that there is more than one player with the
 * same controller index (e.g. Jacob & Esau).
 *
 * Note that this function includes players with a non-undefined parent like e.g. the Strawman
 * Keeper.
 */
export function getPlayersOnKeyboard(): EntityPlayer[] {
  const players = getAllPlayers();

  return players.filter(
    (player) => player.ControllerIndex === ControllerIndex.KEYBOARD,
  );
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
 * Helper function to get all of the players that match the provided controller index. This function
 * returns an array of players because it is possible that there is more than one player with the
 * same controller index (e.g. Jacob & Esau).
 *
 * Note that this function includes players with a non-undefined parent like e.g. the Strawman
 * Keeper.
 */
export function getPlayersWithControllerIndex(
  controllerIndex: ControllerIndex,
): EntityPlayer[] {
  const players = getAllPlayers();
  return players.filter((player) => player.ControllerIndex === controllerIndex);
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
 * Returns the total number of collectibles amongst all players. For example, if player 1 has 1 Sad
 * Onion and player 2 has 2 Sad Onions, then this function would return 3.
 *
 * Note that this will filter out non-real collectibles like Lilith's Incubus.
 */
export function getTotalPlayerCollectibles(
  collectibleType: CollectibleType,
): int {
  const players = getPlayers();
  const numCollectiblesArray = players.map((player) =>
    // We specify "true" as the second argument to filter out things like Lilith's Incubus.
    player.GetCollectibleNum(collectibleType, true),
  );

  return sumArray(numCollectiblesArray);
}

/**
 * Helper function to check to see if a player has one or more collectibles.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * check for. Returns true if the player has any of the supplied collectible types.
 *
 * This function always passes `false` to the `ignoreModifiers` argument.
 */
export function hasCollectible(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
): boolean {
  return collectibleTypes.some((collectibleType) =>
    player.HasCollectible(collectibleType),
  );
}

/**
 * Helper function to check to see if a player has a specific collectible in one or more active
 * slots.
 *
 * This function is variadic, meaning that you can specify as many active slots as you want to check
 * for. This function will return true if the collectible type is located in any of the active slots
 * provided.
 */
export function hasCollectibleInActiveSlot(
  player: EntityPlayer,
  collectibleType: CollectibleType,
  ...activeSlots: ActiveSlot[]
): boolean {
  const matchingActiveSlotsSet = new ReadonlySet(activeSlots);
  const activeItemSlots = getActiveItemSlots(player, collectibleType);

  return activeItemSlots.some((activeSlot) =>
    matchingActiveSlotsSet.has(activeSlot),
  );
}

/**
 * Helper function to check to see if a player has one or more transformations.
 *
 * This function is variadic, meaning that you can supply as many transformations as you want to
 * check for. Returns true if the player has any of the supplied transformations.
 */
export function hasForm(
  player: EntityPlayer,
  ...playerForms: PlayerForm[]
): boolean {
  return playerForms.some((playerForm) => player.HasPlayerForm(playerForm));
}

/** After touching a white fire, a player will turn into The Lost until they clear a room. */
export function hasLostCurse(player: EntityPlayer): boolean {
  const effects = player.GetEffects();
  return effects.HasNullEffect(NullItemID.LOST_CURSE);
}

/**
 * Returns whether the player can hold an additional active item, beyond what they are currently
 * carrying. This takes the Schoolbag into account.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenActiveItemSlot(player: EntityPlayer): boolean {
  if (isCharacter(player, PlayerType.SOUL_B)) {
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

/**
 * Helper function to check if a player has piercing tears.
 *
 * Under the hood, this checks the `EntityPlayer.TearFlags` variable.
 */
export function hasPiercing(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.PIERCING);
}

/**
 * Helper function to check if a player has spectral tears.
 *
 * Under the hood, this checks the `EntityPlayer.TearFlags` variable.
 */
export function hasSpectral(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.SPECTRAL);
}

/**
 * Helper function to check to see if a player has one or more trinkets.
 *
 * This function is variadic, meaning that you can supply as many trinket types as you want to check
 * for. Returns true if the player has any of the supplied trinket types.
 *
 * This function always passes `false` to the `ignoreModifiers` argument.
 */
export function hasTrinket(
  player: EntityPlayer,
  ...trinketTypes: TrinketType[]
): boolean {
  return trinketTypes.some((trinketType) => player.HasTrinket(trinketType));
}

/**
 * Helper function to check if the active slot of a particular player is empty.
 *
 * @param player The player to check.
 * @param activeSlot Optional. The active slot to check. Default is `ActiveSlot.PRIMARY`.
 */
export function isActiveSlotEmpty(
  player: EntityPlayer,
  activeSlot = ActiveSlot.PRIMARY,
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
  const characterSet = new ReadonlySet(characters);
  const character = player.GetPlayerType();

  return characterSet.has(character);
}

/**
 * Helper function to see if a damage source is from a player. Use this instead of comparing to the
 * entity directly because it takes familiars into account.
 */
export function isDamageFromPlayer(damageSource: Entity): boolean {
  const player = damageSource.ToPlayer();
  if (player !== undefined) {
    return true;
  }

  const indirectPlayer = getPlayerFromEntity(damageSource);
  return indirectPlayer !== undefined;
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
  return character === PlayerType.LOST || character === PlayerType.LOST_B;
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

export function isModdedPlayer(player: EntityPlayer): boolean {
  return !isVanillaPlayer(player);
}

/**
 * Helper function for determining if a player is able to turn their head by pressing the shooting
 * buttons.
 *
 * Under the hood, this function uses the `EntityPlayer.IsExtraAnimationFinished` method.
 */
export function isPlayerAbleToAim(player: EntityPlayer): boolean {
  return player.IsExtraAnimationFinished();
}

/** Helper function for detecting if a player is one of the Tainted characters. */
export function isTainted(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return isVanillaPlayer(player)
    ? character >= PlayerType.ISAAC_B
    : isTaintedModded(player);
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
 * Helper function to remove all of the active items from a player. This includes the Schoolbag item
 * and any pocket actives.
 */
export function removeAllActiveItems(player: EntityPlayer): void {
  for (const activeSlot of ACTIVE_SLOT_VALUES) {
    const collectibleType = player.GetActiveItem(activeSlot);
    if (collectibleType === CollectibleType.NULL) {
      continue;
    }

    let stillHasCollectible: boolean;
    do {
      player.RemoveCollectible(collectibleType);
      stillHasCollectible = player.HasCollectible(collectibleType);
    } while (stillHasCollectible);
  }
}

/**
 * Helper function to remove all of the held trinkets from a player.
 *
 * This will not remove any smelted trinkets, unless the player happens to also be holding a trinket
 * that they have smelted. (In that case, both the held and the smelted trinket will be removed.)
 */
export function removeAllPlayerTrinkets(player: EntityPlayer): void {
  for (const trinketSlot of TRINKET_SLOT_VALUES) {
    const trinketType = player.GetTrinket(trinketSlot);
    if (trinketType === TrinketType.NULL) {
      continue;
    }

    let alreadyHasTrinket: boolean;
    do {
      player.TryRemoveTrinket(trinketType);
      alreadyHasTrinket = player.HasTrinket(trinketType);
    } while (alreadyHasTrinket);
  }
}

/**
 * Helper function to remove one or more collectibles to a player.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * remove.
 */
export function removeCollectible(
  player: EntityPlayer,
  ...collectibleTypes: CollectibleType[]
): void {
  for (const collectibleType of collectibleTypes) {
    player.RemoveCollectible(collectibleType);
  }
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
 * Helper function to remove one or more collectibles from all players. If any player has more than
 * one copy of the item, then all copies of it will be removed.
 *
 * This function is variadic, meaning that you can specify as many collectibles as you want to
 * remove.
 */
export function removeCollectibleFromAllPlayers(
  ...collectibleTypes: CollectibleType[]
): void {
  for (const player of getAllPlayers()) {
    for (const collectibleType of collectibleTypes) {
      while (player.HasCollectible(collectibleType, true)) {
        player.RemoveCollectible(collectibleType);
      }
    }
  }
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
 * @param activeSlot Optional. The slot to set. Default is `ActiveSlot.PRIMARY`.
 * @param charge Optional. The argument of charges to set. If not specified, the item will be set
 *               with maximum charges.
 * @param keepInPools Optional. Whether to remove the item from pools. Default is false.
 */
export function setActiveItem(
  player: EntityPlayer,
  collectibleType: CollectibleType,
  activeSlot = ActiveSlot.PRIMARY,
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
  }
}

/**
 * Helper function to blindfold the player by using a hack with the challenge variable.
 *
 * The method used in this function was discovered by im_tem.
 *
 * @param player The player to apply or remove the blindfold state from.
 * @param enabled Whether to apply or remove the blindfold.
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
