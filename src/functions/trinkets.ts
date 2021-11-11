import { GOLDEN_TRINKET_SHIFT } from "../constants";
import { TRINKET_NAME_MAP } from "../trinketNameMap";
import { copySet } from "./util";

export interface TrinketSituation {
  trinketTypeRemoved: TrinketType | int;
  trinket1: TrinketType | int;
  trinket2: TrinketType | int;
  numSmeltedTrinkets: int;
}

/**
 * Helper function to temporarily remove a trinket from the player. Use this in combination with the
 * `giveTrinketBack` function to take away and give back a trinket on the same frame. This function
 * correctly handles multiple trinket slots and ensures that all copies of the trinket are removed,
 * including smelted trinkets.
 *
 * Note that for simplicity, this function assumes that all smelted trinkets are non-golden.
 *
 * @returns Null if the player does not have the trinket, or TrinketSituation if they do.
 */
export function temporarilyRemoveTrinkets(
  player: EntityPlayer,
  trinketType: TrinketType,
): TrinketSituation | undefined {
  if (!player.HasTrinket(trinketType)) {
    return undefined;
  }

  const trinket1 = player.GetTrinket(0);
  const trinket2 = player.GetTrinket(1);

  let numTrinkets = 0;
  while (player.HasTrinket(trinketType)) {
    player.TryRemoveTrinket(trinketType);
    numTrinkets += 1;
  }

  let numSmeltedTrinkets = numTrinkets;
  const trinketWasInSlot1 =
    trinket1 === trinketType || trinket1 + GOLDEN_TRINKET_SHIFT === trinketType;
  if (trinketWasInSlot1) {
    numSmeltedTrinkets -= 1;
  }
  const trinketWasInSlot2 =
    trinket2 === trinketType || trinket2 + GOLDEN_TRINKET_SHIFT === trinketType;
  if (trinketWasInSlot2) {
    numSmeltedTrinkets -= 1;
  }

  return {
    trinketTypeRemoved: trinketType,
    trinket1,
    trinket2,
    numSmeltedTrinkets,
  };
}

/**
 * Helper function to restore the player's trinkets back to the way they were before the
 * `temporarilyRemoveTrinket` function was used. It will re-smelt any smelted trinkets that were
 * removed.
 */
export function giveTrinketsBack(
  player: EntityPlayer,
  trinketSituation: TrinketSituation | undefined,
): void {
  // A trinket situation of undefined signifies that we did not have to remove the trinket
  // If this is the case, we do not have to give anything back
  if (trinketSituation === undefined) {
    return;
  }

  const trinket1 = player.GetTrinket(0);
  const trinket2 = player.GetTrinket(1);

  // Remove any existing trinkets
  if (trinket1 !== TrinketType.TRINKET_NULL) {
    player.TryRemoveTrinket(trinket1);
  }
  if (trinket2 !== TrinketType.TRINKET_NULL) {
    player.TryRemoveTrinket(trinket2);
  }

  // First, add the smelted trinkets back
  for (let i = 0; i < trinketSituation.numSmeltedTrinkets; i++) {
    player.AddTrinket(trinketSituation.trinketTypeRemoved, false);
    player.UseActiveItem(
      CollectibleType.COLLECTIBLE_SMELTER,
      UseFlag.USE_NOANIM,
    );
  }

  // Second, add back the stored trinkets
  if (trinketSituation.trinket1 !== TrinketType.TRINKET_NULL) {
    player.AddTrinket(trinketSituation.trinket1, false);
  }
  if (trinketSituation.trinket2 !== TrinketType.TRINKET_NULL) {
    player.AddTrinket(trinketSituation.trinket2, false);
  }
}

export function getMaxTrinketID(): int {
  const itemConfig = Isaac.GetItemConfig();
  return itemConfig.GetTrinkets().Size - 1;
}

/**
 * This is a helper function to get a trinket name from a TrinketType.
 *
 * Example:
 * ```
 * const trinketType = TrinketType.TRINKET_SWALLOWED_PENNY;
 * const trinketName = getTrinketName(trinketType); // trinketName is "Swallowed Penny"
 * ```
 */
export function getTrinketName(trinketType: TrinketType | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(trinketType) !== "number") {
    return defaultName;
  }

  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.5,
  // so we use a hard-coded map as a workaround
  const trinketName = TRINKET_NAME_MAP.get(trinketType);
  if (trinketName !== undefined) {
    return trinketName;
  }

  const itemConfigItem = itemConfig.GetCollectible(trinketType);
  if (itemConfigItem === undefined) {
    return defaultName;
  }

  return itemConfigItem.Name;
}

const TRINKET_SET = new Set<TrinketType | int>();

function initSet() {
  const itemConfig = Isaac.GetItemConfig();

  for (let trinketType = 1; trinketType <= getMaxTrinketID(); trinketType++) {
    const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
    if (itemConfigTrinket !== undefined) {
      TRINKET_SET.add(trinketType);
    }
  }
}

/** Returns a set containing every valid trinket type in the game, including modded items. */
export function getTrinketSet(): Set<TrinketType | int> {
  // Lazy initialize the set
  if (TRINKET_SET.size === 0) {
    initSet();
  }

  return copySet(TRINKET_SET);
}
