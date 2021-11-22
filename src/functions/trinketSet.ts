import { getMaxTrinketID } from "./trinkets";
import { copySet } from "./util";

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
