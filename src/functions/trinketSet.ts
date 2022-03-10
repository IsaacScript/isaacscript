import { itemConfig } from "../cachedClasses";
import { range } from "./math";
import { copySet } from "./set";
import { getMaxTrinketType } from "./trinkets";

const TRINKET_SET = new Set<TrinketType | int>();

function initTrinketSet() {
  const maxTrinketID = getMaxTrinketType();

  for (const trinketType of range(1, maxTrinketID)) {
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
    initTrinketSet();
  }

  return copySet(TRINKET_SET);
}
