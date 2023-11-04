import {
  PlayerType,
  TrinketSlot,
  TrinketType,
} from "isaac-typescript-definitions";
import { TRINKET_SLOT_VALUES } from "../arrays/cachedEnumValues";
import { itemConfig } from "../core/cachedClasses";
import { getAllPlayers, getPlayers } from "./playerIndex";
import { isCharacter } from "./players";

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

/**
 * Returns the slot number corresponding to where a trinket can be safely inserted.
 *
 * For example:
 *
 * ```ts
 * const player = Isaac.GetPlayer();
 * const trinketSlot = getOpenTrinketSlotNum(player);
 * if (trinketSlot !== undefined) {
 *   // They have one or more open trinket slots
 *   player.AddTrinket(TrinketType.SWALLOWED_PENNY);
 * }
 * ```
 */
export function getOpenTrinketSlot(player: EntityPlayer): int | undefined {
  const maxTrinkets = player.GetMaxTrinkets();
  const trinketType1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinketType2 = player.GetTrinket(TrinketSlot.SLOT_2);

  if (maxTrinkets === 1) {
    return trinketType1 === TrinketType.NULL ? 0 : undefined;
  }

  if (maxTrinkets === 2) {
    if (trinketType1 === TrinketType.NULL) {
      return 0;
    }

    return trinketType2 === TrinketType.NULL ? 1 : undefined;
  }

  error(`The player has an unknown number of trinket slots: ${maxTrinkets}`);
}

/**
 * Helper function to get all of the trinkets that the player is currently holding. This will not
 * include any smelted trinkets.
 */
export function getPlayerTrinkets(player: EntityPlayer): TrinketType[] {
  const trinketTypes: TrinketType[] = [];

  for (const trinketSlot of TRINKET_SLOT_VALUES) {
    const trinketType = player.GetTrinket(trinketSlot);
    if (trinketType !== TrinketType.NULL) {
      trinketTypes.push(trinketType);
    }
  }

  return trinketTypes;
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

/** Helper function to check to see if the player is holding one or more trinkets. */
export function hasAnyTrinket(player: EntityPlayer): boolean {
  const playerTrinketTypes = TRINKET_SLOT_VALUES.map((trinketSlot) =>
    player.GetTrinket(trinketSlot),
  );
  return playerTrinketTypes.some(
    (trinketType) => trinketType !== TrinketType.NULL,
  );
}

/**
 * Returns whether the player can hold an additional trinket, beyond what they are currently
 * carrying. This takes into account items that modify the max number of trinkets, like Mom's Purse.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenTrinketSlot(player: EntityPlayer): boolean {
  if (isCharacter(player, PlayerType.SOUL_B)) {
    return false;
  }

  const openTrinketSlot = getOpenTrinketSlot(player);
  return openTrinketSlot !== undefined;
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
