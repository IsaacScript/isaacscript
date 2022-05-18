import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { MAX_TRINKET_TYPE } from "../constantsMax";
import { copySet } from "./set";
import { irange } from "./utils";

const TRINKET_SET = new Set<TrinketType | int>();

function initTrinketSet() {
  for (const trinketType of irange(1, MAX_TRINKET_TYPE)) {
    const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
    if (itemConfigTrinket !== undefined) {
      TRINKET_SET.add(trinketType);
    }
  }
}

/** Returns a set containing every valid trinket type in the game, including modded items. */
export function getTrinketSet(): Set<TrinketType | int> {
  // Lazy initialize the set.
  if (TRINKET_SET.size === 0) {
    initTrinketSet();
  }

  return copySet(TRINKET_SET);
}
