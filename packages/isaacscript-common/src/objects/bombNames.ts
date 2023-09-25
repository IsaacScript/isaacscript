import { BombSubType } from "isaac-typescript-definitions";

export const DEFAULT_BOMB_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const BOMB_NAMES = {
  [BombSubType.NULL]: DEFAULT_BOMB_NAME, // 0
  [BombSubType.NORMAL]: "Bomb", // 1
  [BombSubType.DOUBLE_PACK]: "Double Bomb", // 2
  [BombSubType.TROLL]: "Troll Bomb", // 3
  [BombSubType.GOLDEN]: "Golden Bomb", // 4
  [BombSubType.MEGA_TROLL]: "Megatroll Bomb", // 5
  // The entry for "Golden Troll Bomb" is absent in "entities2.xml", so we infer the name.
  [BombSubType.GOLDEN_TROLL]: "Golden Troll Bomb", // 6
  [BombSubType.GIGA]: "Giga Bomb", // 7
} as const satisfies Record<BombSubType, string>;
