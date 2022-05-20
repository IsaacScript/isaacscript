import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { FIRST_TRINKET_TYPE, MAX_TRINKET_TYPE } from "../constantsMax";
import { copySet } from "./set";
import { irange } from "./utils";

const TRINKET_SET = new Set<TrinketType>();

function initTrinketSet() {
  for (const trinketTypeInt of irange(FIRST_TRINKET_TYPE, MAX_TRINKET_TYPE)) {
    const trinketType = trinketTypeInt as TrinketType;
    const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
    if (itemConfigTrinket !== undefined) {
      TRINKET_SET.add(trinketType);
    }
  }
}

/** Returns a set containing every valid trinket type in the game, including modded items. */
export function getTrinketSet(): Set<TrinketType> {
  // Lazy initialize the set.
  if (TRINKET_SET.size === 0) {
    initTrinketSet();
  }

  return copySet(TRINKET_SET);
}
