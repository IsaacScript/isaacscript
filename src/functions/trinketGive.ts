import { GOLDEN_TRINKET_SHIFT } from "../constants";
import { TrinketSituation } from "../types/TrinketSituation";

/**
 * Helper function to temporarily remove a specific kind of trinket from the player. Use this in
 * combination with the `giveTrinketBack` function to take away and give back a trinket on the same
 * frame. This function correctly handles multiple trinket slots and ensures that all copies of the
 * trinket are removed, including smelted trinkets.
 *
 * Note that for simplicity, this function assumes that all smelted trinkets are non-golden.
 *
 * @returns Undefined if the player does not have the trinket, or TrinketSituation if they do.
 */
export function temporarilyRemoveTrinket(
  player: EntityPlayer,
  trinketType: TrinketType | int,
): TrinketSituation | undefined {
  if (!player.HasTrinket(trinketType)) {
    return undefined;
  }

  const trinket1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinket2 = player.GetTrinket(TrinketSlot.SLOT_2);

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
 * Helper function to temporarily removes a player's held trinkets, if any. This will not remove any
 * smelted trinkets. Use this in combination with the `giveTrinketBack` function to take away and
 * give back trinkets on the same frame.
 *
 * @returns Undefined if the player does not have any trinkets, or TrinketSituation if they do.
 */
export function temporarilyRemoveTrinkets(
  player: EntityPlayer,
): TrinketSituation | undefined {
  const trinket1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinket2 = player.GetTrinket(TrinketSlot.SLOT_2);

  if (
    trinket1 === TrinketType.TRINKET_NULL &&
    trinket2 === TrinketType.TRINKET_NULL
  ) {
    return undefined;
  }

  if (trinket1 !== TrinketType.TRINKET_NULL) {
    player.TryRemoveTrinket(trinket1);
  }

  if (trinket2 !== TrinketType.TRINKET_NULL) {
    player.TryRemoveTrinket(trinket2);
  }

  return {
    trinketTypeRemoved: TrinketType.TRINKET_NULL,
    trinket1,
    trinket2,
    numSmeltedTrinkets: 0,
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

  const trinket1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinket2 = player.GetTrinket(TrinketSlot.SLOT_2);

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
