import PocketItemDescription from "../types/PocketItemDescription";
import PocketItemType from "../types/PocketItemType";
import { getCollectibleSet } from "./util";

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
export type PlayerIndex = string & { __playerIndexBrand: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

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
    error("Failed to find any players.");
  }

  return closestPlayer;
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

  error(`The player has an unknown number of trinket slots: ${maxTrinkets}`);
  return null;
}

/**
 * Iterates over all players and checks if any are close enough to the specified position.
 *
 * @returns The first player found when iterating upwards from index 0.
 */
export function getPlayerCloserThan(
  position: Vector,
  distance: float,
): EntityPlayer | null {
  for (const player of getPlayers()) {
    if (player.Position.Distance(position) <= distance) {
      return player;
    }
  }

  return null;
}

/**
 * Iterates over every item in the game and returns a map containing the number of each item that
 * the player has.
 */
export function getPlayerCollectibleMap(
  player: EntityPlayer,
): Map<CollectibleType | int, int> {
  const collectibleMap = new Map<CollectibleType | int, int>();
  for (const collectibleType of getCollectibleSet()) {
    // We check for both "HasCollectible()" and "GetCollectibleNum()" to avoid bugs in special cases
    // (e.g. Lilith having 1 Incubus despite not really having the collectible)
    if (!player.HasCollectible(collectibleType)) {
      continue;
    }

    const collectibleNum = player.GetCollectibleNum(collectibleType);
    if (collectibleNum > 0) {
      collectibleMap.set(collectibleType, collectibleNum);
    }
  }

  return collectibleMap;
}

/**
 * This function always excludes players with a non-null parent, since they are not real players
 * (e.g. the Strawman Keeper).
 *
 * @param performExclusions Whether or not to exclude characters that are not directly controlled by
 * the player (i.e. Esau & Tainted Soul). False by default.
 */
export function getPlayers(performExclusions = false): EntityPlayer[] {
  const game = Game();

  const players: EntityPlayer[] = [];
  for (let i = 0; i < game.GetNumPlayers(); i++) {
    const player = Isaac.GetPlayer(i);
    if (player === null) {
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
  const seedString = seed.toString();

  return seedString as PlayerIndex;
}

/** Get the index of this player with respect to the output of the `Isaac.GetPlayer()` function. */
export function getPlayerIndexVanilla(playerToFind: EntityPlayer): int | null {
  const game = Game();

  const playerToFindHash = GetPtrHash(playerToFind);

  for (let i = 0; i < game.GetNumPlayers(); i++) {
    const player = Isaac.GetPlayer(i);
    if (player === null) {
      continue;
    }

    const playerHash = GetPtrHash(player);
    if (playerHash === playerToFindHash) {
      return i;
    }
  }

  return null;
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

export function hasOpenPocketItemSlot(player: EntityPlayer): boolean {
  const pocketItems = getPocketItems(player);
  for (const pocketItem of pocketItems) {
    if (pocketItem.type === PocketItemType.EMPTY) {
      return true;
    }
  }

  return false;
}

export function hasOpenTrinketSlot(player: EntityPlayer): boolean {
  const openTrinketSlot = getOpenTrinketSlot(player);
  return openTrinketSlot !== null;
}

/**
 * Some players are "child" players, meaning that they have a non-null Parent property.
 * (For example, the Strawman Keeper.)
 */
export function isChildPlayer(player: EntityPlayer): boolean {
  return player.Parent !== null;
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

export function removeDeadEyeMultiplier(player: EntityPlayer): void {
  // Each time the "ClearDeadEyeCharge()" function is called, it only has a chance of working,
  // so just call it 100 times to be safe
  for (let i = 0; i < 100; i++) {
    player.ClearDeadEyeCharge();
  }
}
