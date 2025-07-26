import {
  CollectibleType,
  TrinketSlot,
  TrinketType,
} from "isaac-typescript-definitions";
import type { TrinketSituation } from "../interfaces/TrinketSituation";
import { useActiveItemTemp } from "./playerCollectibles";
import { getGoldenTrinketType } from "./trinkets";
import { repeat } from "./utils";

/**
 * Helper function to restore the player's trinkets back to the way they were before the
 * `temporarilyRemoveTrinket` function was used. It will re-smelt any smelted trinkets that were
 * removed.
 */
export function giveTrinketsBack(
  player: EntityPlayer,
  trinketSituation: TrinketSituation | undefined,
): void {
  // A trinket situation of undefined signifies that we did not have to remove the trinket. If this
  // is the case, we do not have to give anything back.
  if (trinketSituation === undefined) {
    return;
  }

  const trinketType1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinketType2 = player.GetTrinket(TrinketSlot.SLOT_2);

  // Remove any existing trinkets.
  if (trinketType1 !== TrinketType.NULL) {
    player.TryRemoveTrinket(trinketType1);
  }
  if (trinketType2 !== TrinketType.NULL) {
    player.TryRemoveTrinket(trinketType2);
  }

  // First, add the smelted trinkets back.
  repeat(trinketSituation.numSmeltedTrinkets, () => {
    player.AddTrinket(trinketSituation.trinketTypeRemoved, false);
    useActiveItemTemp(player, CollectibleType.SMELTER);
  });

  // Second, add back the stored trinkets.
  if (trinketSituation.trinketType1 !== TrinketType.NULL) {
    player.AddTrinket(trinketSituation.trinketType1, false);
  }
  if (trinketSituation.trinketType2 !== TrinketType.NULL) {
    player.AddTrinket(trinketSituation.trinketType2, false);
  }
}

/**
 * Helper function to smelt a trinket. Before smelting, this function will automatically remove the
 * trinkets that the player is holding, if any, and then give them back after the new trinket is
 * smelted.
 *
 * @param player The player to smelt the trinkets to.
 * @param trinketType The trinket type to smelt.
 * @param numTrinkets Optional. If specified, will smelt the given number of trinkets. Use this to
 *                    avoid calling this function multiple times. Default is 1.
 */
export function smeltTrinket(
  player: EntityPlayer,
  trinketType: TrinketType,
  numTrinkets = 1,
): void {
  const trinketSituation = temporarilyRemoveTrinkets(player);

  repeat(numTrinkets, () => {
    player.AddTrinket(trinketType);
    useActiveItemTemp(player, CollectibleType.SMELTER);
  });

  giveTrinketsBack(player, trinketSituation);
}

/**
 * Helper function to smelt two or more different trinkets. If you want to smelt one trinket (or
 * multiple copies of one trinket), then use the `smeltTrinket` helper function instead.
 *
 * This function is variadic, meaning that you can pass as many trinket types as you want to smelt.
 *
 * Before smelting, this function will automatically remove the trinkets that the player is holding,
 * if any, and then give them back after the new trinket is smelted.
 *
 * @param player The player to smelt the trinkets to.
 * @param trinketTypes The trinket types to smelt.
 */
export function smeltTrinkets(
  player: EntityPlayer,
  ...trinketTypes: readonly TrinketType[]
): void {
  for (const trinketType of trinketTypes) {
    smeltTrinket(player, trinketType);
  }
}

/**
 * Helper function to temporarily remove a specific kind of trinket from the player. Use this in
 * combination with the `giveTrinketsBack` function to take away and give back a trinket on the same
 * frame. This function correctly handles multiple trinket slots and ensures that all copies of the
 * trinket are removed, including smelted trinkets.
 *
 * Note that one smelted golden trinket is the same as two smelted normal trinkets.
 *
 * @returns Undefined if the player does not have the trinket, or TrinketSituation if they do.
 */
export function temporarilyRemoveTrinket(
  player: EntityPlayer,
  trinketType: TrinketType,
): TrinketSituation | undefined {
  if (!player.HasTrinket(trinketType)) {
    return undefined;
  }

  const trinketType1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinketType2 = player.GetTrinket(TrinketSlot.SLOT_2);

  let numTrinkets = 0;
  while (player.HasTrinket(trinketType)) {
    player.TryRemoveTrinket(trinketType);
    numTrinkets++;
  }

  let numSmeltedTrinkets = numTrinkets;
  const trinketWasInSlot1 =
    trinketType1 === trinketType
    || trinketType1 === getGoldenTrinketType(trinketType);
  if (trinketWasInSlot1) {
    numSmeltedTrinkets--;
  }
  const trinketWasInSlot2 =
    trinketType2 === trinketType
    || trinketType2 === getGoldenTrinketType(trinketType);
  if (trinketWasInSlot2) {
    numSmeltedTrinkets--;
  }

  return {
    trinketTypeRemoved: trinketType,
    trinketType1,
    trinketType2,
    numSmeltedTrinkets,
  };
}

/**
 * Helper function to temporarily removes a player's held trinkets, if any. This will not remove any
 * smelted trinkets. Use this in combination with the `giveTrinketsBack` function to take away and
 * give back trinkets on the same frame.
 *
 * @returns Undefined if the player does not have any trinkets, or TrinketSituation if they do.
 */
export function temporarilyRemoveTrinkets(
  player: EntityPlayer,
): TrinketSituation | undefined {
  const trinketType1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinketType2 = player.GetTrinket(TrinketSlot.SLOT_2);

  if (trinketType1 === TrinketType.NULL && trinketType2 === TrinketType.NULL) {
    return undefined;
  }

  if (trinketType1 !== TrinketType.NULL) {
    player.TryRemoveTrinket(trinketType1);
  }

  if (trinketType2 !== TrinketType.NULL) {
    player.TryRemoveTrinket(trinketType2);
  }

  return {
    trinketTypeRemoved: TrinketType.NULL,
    trinketType1,
    trinketType2,
    numSmeltedTrinkets: 0,
  };
}
