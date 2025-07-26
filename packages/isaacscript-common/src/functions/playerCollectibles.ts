import {
  ActiveSlot,
  CollectibleType,
  PlayerType,
} from "isaac-typescript-definitions";
import { ACTIVE_SLOT_VALUES } from "../cachedEnumValues";
import { game, itemConfig } from "../core/cachedClasses";
import { ReadonlySet } from "../types/ReadonlySet";
import { sumArray } from "./array";
import { getCollectibleMaxCharges } from "./collectibles";
import { getAllPlayers, getPlayers } from "./playerIndex";
import { isCharacter } from "./players";

/**
 * Helper function to add one or more collectibles to a player.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * add.
 */
export function addCollectible(
  player: EntityPlayer,
  ...collectibleTypes: readonly CollectibleType[]
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

/**
 * Helper function to find the active slots that the player has the corresponding collectible type
 * in. Returns an empty array if the player does not have the collectible in any active slot.
 */
export function getActiveItemSlots(
  player: EntityPlayer,
  collectibleType: CollectibleType,
): readonly ActiveSlot[] {
  return ACTIVE_SLOT_VALUES.filter((activeSlot) => {
    const activeItem = player.GetActiveItem(activeSlot);
    return activeItem === collectibleType;
  });
}

/**
 * Helper function to get the adjusted price for a pickup, depending on how many Steam Sales all
 * players currently have. (For example, if Jacob has one Steam Sale and Esau has one Steam Sale,
 * the prices for items in the shop would be the same as if Isaac had two Steam Sales.)
 */
export function getAdjustedPrice(basePrice: int): int {
  const numSteamSales = getTotalPlayerCollectibles(CollectibleType.STEAM_SALE);
  return numSteamSales > 0
    ? Math.floor(basePrice / (numSteamSales + 1))
    : basePrice;
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
  ...collectibleTypes: readonly CollectibleType[]
): int {
  let numCollectibles = 0;
  for (const collectibleType of collectibleTypes) {
    // We specify "true" as the second argument to filter out things like Lilith's Incubus.
    numCollectibles += player.GetCollectibleNum(collectibleType, true);
  }

  return numCollectibles;
}

/**
 * Helper function to get only the players that have a certain collectible.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * check for. It only returns the players that have all of the collectibles.
 */
export function getPlayersWithCollectible(
  ...collectibleTypes: readonly CollectibleType[]
): readonly EntityPlayer[] {
  const players = getPlayers();

  return players.filter((player) =>
    collectibleTypes.every((collectibleType) =>
      player.HasCollectible(collectibleType),
    ),
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
  ...collectibleTypes: readonly CollectibleType[]
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
  ...activeSlots: readonly ActiveSlot[]
): boolean {
  const matchingActiveSlotsSet = new ReadonlySet(activeSlots);
  const activeItemSlots = getActiveItemSlots(player, collectibleType);

  return activeItemSlots.some((activeSlot) =>
    matchingActiveSlotsSet.has(activeSlot),
  );
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
      activeItemPrimary === CollectibleType.NULL
      || activeItemSecondary === CollectibleType.NULL
    );
  }

  return activeItemPrimary === CollectibleType.NULL;
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
 * Helper function to remove one or more collectibles to a player.
 *
 * This function is variadic, meaning that you can supply as many collectible types as you want to
 * remove.
 */
export function removeCollectible(
  player: EntityPlayer,
  ...collectibleTypes: readonly CollectibleType[]
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
  ...collectibleTypes: readonly CollectibleType[]
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

  charge ??= getCollectibleMaxCharges(collectibleType);

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
 * Helper function to use an active item without showing an animation, keeping the item, or adding
 * any costumes.
 */
export function useActiveItemTemp(
  player: EntityPlayer,
  collectibleType: CollectibleType,
): void {
  player.UseActiveItem(collectibleType, false, false, true, false, -1);
}
