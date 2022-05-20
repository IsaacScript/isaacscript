import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { copySet } from "./set";
import { getTrinketTypeRange } from "./trinkets";

const TRINKET_SET = new Set<TrinketType>();

function initTrinketSet() {
  for (const trinketType of getTrinketTypeRange()) {
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
